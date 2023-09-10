import { message } from "antd";
import mitt from "mitt";

let wsInstance: any = null;

export const getConnection = () => {
  if (wsInstance) return wsInstance;
  return (wsInstance = new WebSocket("ws://localhost:8080/api/ws"));
};

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
  const ws = getConnection() as WebSocket;

  ws.addEventListener("message", (event) => {
    let data: any = null;
    try {
      data = JSON.parse(event.data);
    } catch (error) {}
    if (data) {
      // 消息类型为 event 事件
      if (data.type === "event") {
        subscriber.emit("event", data);
      }
      if (data.type === "message") {
        subscriber.emit("message", data);
      }
    }
  });
  ws.addEventListener("open", (event) => {
    message.info("事件助手连接成功");
    //   subscriber.emit("open", event);
  });
  ws.addEventListener("close", (event) => {
    //   subscriber.emit("close", event);
  });
  ws.addEventListener("error", (event) => {
    //   subscriber.emit("error", event);
  });
  return () => {
    ws.close();
    wsInstance = null;
  };
};
