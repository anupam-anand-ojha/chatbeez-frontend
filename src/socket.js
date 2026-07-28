import { io } from "socket.io-client";

const socket = io( import.meta.env.MODE=== "development"
     ?"http://localhost:3000"
     :"https://chatbeez-backend.onrender.com",{
        withCredentials: true,
     }
);

export default socket;