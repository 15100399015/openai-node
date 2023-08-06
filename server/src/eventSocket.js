const { parse } = require("url")
const { WebSocketServer } = require("ws")
const cookie = require("cookie")
let connectTable = {

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
        server.on("close", (req, res) => {
            console.log("exit");
        })
    }
}

const eventSocket = new EventSocket({
    path: "/api/ws"
})

eventSocket.on('connection', (wss, req) => {
    const { session } = cookie.parse(req.headers.cookie);
    connectTable[session] = wss
    wss.on('error', console.error);
});

eventSocket.on('close', function close(wss, req) {
    console.log(wss, req);
});

eventSocket.on("error", function close(wss, req) {
    console.log(wss, req);
});

module.exports = {
    eventSocket,
    connectTable
} 