import { message } from "antd";
import mitt from "mitt";

export const subscriber = mitt();
const socketHost = "ws://localhost:8080/api/ws";
let ws: WebSocket | null = null;

function onMessage(event: any) {
  let data: any = null;
  try {
    data = JSON.parse(event.data);
  } catch (error) {}
  if (data) {
    if (data.type === "event") {
      subscriber.emit("event", data);
    }
    if (data.type === "message") {
      subscriber.emit("message", data);
    }
  }
}
function onError(event: any) {
  console.error(event);
}
function onOpen(event: any) {
  message.info("事件助手连接成功");
}
function onClose(event: any) {
  ws?.removeEventListener("close", onClose);
  ws?.removeEventListener("open", onOpen);
  ws?.removeEventListener("message", onMessage);
  ws?.removeEventListener("error", onError);
  console.log("事件助手失联了");
  const reconnect = confirm("事件助手失联了,是否重连?");
  if (reconnect) {
    connectEventSocket();
  }
}

export const connectEventSocket = () => {
  ws = null;
  ws = new WebSocket(socketHost);
  ws.addEventListener("error", onError);
  ws.addEventListener("open", onOpen);
  ws.addEventListener("close", onClose);
  ws.addEventListener("message", onMessage);
};
