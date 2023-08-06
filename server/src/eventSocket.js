const { parse } = require("url")
const { WebSocketServer } = require("ws")

class EventSocket extends WebSocketServer {
    constructor(config) {
        super({ noServer: true })
        const { path } = config
        this.path = path
    }
    init(server) {
        server.on('upgrade', (request, socket, head) => {
            const { pathname } = parse(request.url);
            if (pathname === path) {
                this.handleUpgrade(request, socket, head, (ws) => {
                    this.emit('connection', ws, request);
                });
            } else {
                this.destroy();
            }
        });
    }
}



module.exports.eventSocket = new EventSocket({
    path: "/ws"
})