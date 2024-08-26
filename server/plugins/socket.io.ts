import type {NitroApp} from "nitropack";
import {Server as Engine} from "engine.io";
import {Server} from "socket.io";
import {defineEventHandler} from "h3";
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "@/app/schemas/io";
import {ChatManager} from "~/app/classes/ChatManager";
import {ChatIdSchema, SentChatMessageSchema, UsernameSchema} from "~/app/schemas/chat";

export default defineNitroPlugin((nitroApp: NitroApp) => {
    const engine = new Engine();
    const io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >();

    io.bind(engine);

    const chatManager = new ChatManager()

    io.on("connection", (socket) => {
        const chatId = ChatIdSchema.parse(socket.handshake.query.chatId).trim()
        const author = UsernameSchema.parse(socket.handshake.query.username).trim()

        socket.join(chatId)
        const chat = chatManager.firstOrCreate(chatId)

        socket.emit('message.all', chat.allMessages())

        socket.on('message.sent', (data) => {
            const sentMsg = SentChatMessageSchema.parse(data)

            const msg = chat.sendMessage(author, sentMsg)

            io.to(chatId).emit('message.received', msg)
        })

        socket.on('message.typing.started', () => {
            chat.startTyping(author)
            io.to(chatId).emit('message.typing', chat.allTypingAuthors())
        })

        socket.on('message.typing.stopped', () => {
            chat.stopTyping(author)
            io.to(chatId).emit('message.typing', chat.allTypingAuthors())
        })
    });

    nitroApp.router.use("/socket.io/", defineEventHandler({
        handler(event) {
            engine.handleRequest(event.node.req, event.node.res);
            event._handled = true;
        },
        websocket: {
            open(peer) {
                const nodeContext = peer.ctx.node;
                const req = nodeContext.req;

                // @ts-expect-error private method
                engine.prepare(req);

                const rawSocket = nodeContext.req.socket;
                const websocket = nodeContext.ws;

                // @ts-expect-error private method
                engine.onWebSocket(req, rawSocket, websocket);
            }
        }
    }));
});