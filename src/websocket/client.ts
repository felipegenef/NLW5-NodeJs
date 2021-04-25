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

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionsService.findSocketId(socket_id);
    const message = await messagesService.create({ text, user_id });
    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  });
});
