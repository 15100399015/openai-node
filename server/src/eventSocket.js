const { parse } = require("url")
const { WebSocketServer } = require("ws")



let connect = {
    currentConnect: null
}

class EventSocket extends WebSocketServer {
    constructor(config) {
        super({ noServer: true })
        const { path } = config
        this.path = path
    }
    init = (server) => {
        server.on('upgrade', (request, socket, head) => {
            const { pathname } = parse(request.url);
            if (pathname === this.path) {
                this.handleUpgrade(request, socket, head, (ws) => {
                    this.emit('connection', ws, request);
                });
            } else {
                this.destroy();
            }
        });
    }
}

const eventSocket = new EventSocket({
    path: "/api/ws"
})
eventSocket.on('connection', function connection(ws) {
    connect.currentConnect = ws
    ws.on('error', console.error);
});
module.exports = {
    eventSocket,
    connect
} 