import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets/decorators";

@WebSocketGateway(99, { namespace: 'chat' })
export class ChatGateway{
   @WebSocketServer()
   private server;
   
   @SubscribeMessage('message')
   handle(@MessageBody() message: string): void{
     this.server.emit('message', message);
   }

}
