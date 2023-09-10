const { parse } = require("url")
const { WebSocketServer } = require("ws")
const cookie = require("cookie")
let connectTable = {}
function getConnection(session) {
  return connectTable[session]
}
class EventSocket extends WebSocketServer {
  constructor(config) {
    super({ noServer: true });
    const { path } = config;
    this.path = path;
  }
  init = (server) => {
    server.on("upgrade", (request, socket, head) => {
      const { pathname } = parse(request.url);
      if (pathname === this.path) {
        this.handleUpgrade(request, socket, head, (ws) => {
          this.emit("connection", ws, request);
        });
      } else {
        this.destroy();
      }
    });
  };
}

const eventSocket = new EventSocket({
  path: "/api/ws",
});

eventSocket.on("connection", (wss, req) => {
  const { session } = cookie.parse(req.headers.cookie);
  // 添加进记录表
  Reflect.set(connectTable, session, wss);
  wss.on("close", () => {
    Reflect.deleteProperty(connectTable, session);
  });
  wss.on("error", console.error);
});

eventSocket.on("error", console.error);

module.exports = {
  eventSocket,
  connectTable,
  getConnection
} 
