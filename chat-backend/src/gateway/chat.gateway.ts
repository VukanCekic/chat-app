import { OnGatewayDisconnect } from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/user-message/user-message.model';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ cors: '*:*' })
export class MessagesGateway {
  constructor(
    @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server;

  async getLastMessagesFromRoom(room) {
    const roomMessages = await this.messagesModel.aggregate([
      { $match: { to: room } },
      { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } },
    ]);
    return roomMessages;
  }

  sortRoomMessagesByDate(messages) {
    return messages.sort(function (a, b) {
      let date1 = a._id;
      let date2 = b._id;

      return Date.parse(date1) - Date.parse(date2);
    });
  }

  @SubscribeMessage('new-user')
  async join(client: Socket, data: { name: string }) {
    let user = await this.usersModel.findOne({ name: data.name });
    const onlineUsers = await this.usersModel.find({ status: 'online' });

    user.clientId = client.id;
    user = await this.usersModel.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    this.server.emit('new-user-client', {
      online: onlineUsers,
      user: user.name,
      event: 'new-user-client',
    });
  }

  @SubscribeMessage('join-room')
  async joinRoom(client: Socket, data: { room: string; currentRoom: string }) {
    client.join(data.room);
    client.leave(data.currentRoom);
    let roomMessages = await this.getLastMessagesFromRoom(data.room);
    roomMessages = this.sortRoomMessagesByDate(roomMessages);
    client.emit('room-messages', roomMessages);
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(client: Socket) {
    const onlineUsers = await this.usersModel.find({ status: 'online' });
    client.broadcast.emit('users-changed', { online: onlineUsers });
  }

  @SubscribeMessage('message-room')
  async addMessage(
    client: Socket,
    data: { roomId; message; user; time; todayDate },
  ) {
    await this.messagesModel.create({
      content: data.message,
      from: data.user,
      time: data.time,
      date: data.todayDate,
      to: data.roomId,
    });
    let roomMessages = await this.getLastMessagesFromRoom(data.roomId);
    roomMessages = this.sortRoomMessagesByDate(roomMessages);
    this.server.emit('room-messages', roomMessages);
    client.broadcast.emit('notifications', data.roomId);
  }
}
