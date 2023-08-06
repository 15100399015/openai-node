const { parse } = require("url")
const { WebSocketServer } = require("ws")

class EventSocket extends WebSocketServer {
    constructor(config) {
        const { server, path } = config
        super({ noServer: true })
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



module.exports.EventSocket = EventSocket