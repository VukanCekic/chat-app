import { OnGatewayDisconnect } from '@nestjs/websockets';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/user-message/user-message.model';
import { Room } from 'src/user-room/user-room.model';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ cors: '*:*' })
export class MessagesGateway implements OnGatewayDisconnect {
  public rooms = ['arcade', 'dance-hall', 'studio-b', 'traphouse'];

  constructor(
    @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
    @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleDisconnect(client: Socket) {
    const user = await this.usersModel.findOne({ clientId: client.id });
    if (user) {
      this.server.emit('users-changed', { user: user.name, event: 'left' });
      user.clientId = null;
      await this.usersModel.findByIdAndUpdate(user._id, user);
    }
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(client: Socket, data: { name: string }) {

    let user = await this.usersModel.findOne({ name: data.name });
    const onlineUsers = await this.usersModel.find({ status: 'online' });
    console.log(onlineUsers);

    user.clientId = uuidv4();
    user = await this.usersModel.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    client.join(this.rooms[0]);
    client.emit('users-changed', {
      online: onlineUsers,
      user: user.name,
      event: 'joined',
    });
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(
    client: Socket,
    data: { name: string; roomId: string },
  ) {
    const user = await this.usersModel.findOne({ name: data.name });
    client.broadcast
      .to(data.roomId)
      .emit('users-changed', { user: user.name, event: 'left' });
    client.leave(data.roomId);
  }

  @SubscribeMessage('add-message')
  async addMessage(client: Socket, message: Message) {
    message.owner = await this.usersModel.findOne({ clientId: client.id });
    message.created = new Date();
    message = await this.messagesModel.create(message);
    this.server.in(message.room as string).emit('message', message);
  }
}
