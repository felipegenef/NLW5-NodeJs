import { http } from "../src/http";
import "./websocket/client";
import "./websocket/admin";

const PORT = process.env.PORT || 3333;

http.listen(PORT, () => console.log(`Server is running on ${PORT} `));
