import { io } from "socket.io-client";

const socket = io(
     "https://chatbeez-backend.onrender.com"
);

export default socket;