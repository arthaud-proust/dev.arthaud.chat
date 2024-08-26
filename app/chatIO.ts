import {ChatManager} from "@/app/classes/ChatManager";
import {ChatIdSchema, ChatMessageIdSchema, ReactToMessageSchema, SentChatMessageSchema, UsernameSchema} from "@/app/schemas/chat";
import type {IOServer} from "@/app/schemas/io";

export const setupChatIO = (io: IOServer) => {
    const chatManager = new ChatManager()

    io.on("connection", (socket) => {
        const chatId = ChatIdSchema.parse(socket.handshake.query.chatId).trim()
        const author = UsernameSchema.parse(socket.handshake.query.username).trim()

        socket.join(chatId)
        const chat = chatManager.firstOrCreate(chatId)

        socket.emit('message.all', chat.allMessages())

        socket.on('message.sent', (data) => {
            const message = chat.sendMessage(author, SentChatMessageSchema.parse(data))

            io.to(chatId).emit('message.received', message)
        })

        socket.on('message.typing.started', () => {
            chat.startTyping(author)

            io.to(chatId).emit('message.typing', chat.allTypingAuthors())
        })

        socket.on('message.typing.stopped', () => {
            chat.stopTyping(author)

            io.to(chatId).emit('message.typing', chat.allTypingAuthors())
        })

        socket.on('message.react', (data) => {
            const updatedMessage = chat.react(author, ReactToMessageSchema.parse(data))

            io.to(chatId).emit('message.updated', updatedMessage)
        })

        socket.on('message.unreact', (data) => {
            const updatedMessage = chat.unreact(author, ChatMessageIdSchema.parse(data))

            io.to(chatId).emit('message.updated', updatedMessage)
        })
    });
}