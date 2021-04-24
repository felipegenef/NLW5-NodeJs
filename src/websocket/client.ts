import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UserService } from "../services/UserService";
import { MessageService } from "../services/MessageService";
interface iParams {
  text: string;
  email: string;
}
io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const userService = new UserService();
  const messagesService = new MessageService();

  socket.on("client-first-access", async (params) => {
    const socket_id = socket.id;
    let user_id = null;
    const { text, email } = params as iParams;
    const userExists = await userService.findByEmail(email);
    if (!userExists) {
      const user = await userService.create(email);
      user_id = user.id;
      await connectionsService.create({ socket_id, user_id });
    } else {
      const connection = await connectionsService.findByUserId(userExists.id);
      user_id = userExists.id;
      if (!connection) {
        await connectionsService.create({ socket_id, user_id });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }
    await messagesService.create({ text, user_id });
  });
});
