import io from "socket.io-client";

const socket = io("http://192.168.100.3:3003");

export default socket;