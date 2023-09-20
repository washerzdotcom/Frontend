import constant from "../constant";
import { io } from "socket.io-client";

const socket = io(constant.washrzserver);
socket.on("connect", () => {
    console.log("id--------->",socket.id); // x8WIv7-mJelg7on_ALbx
  });
export default socket;