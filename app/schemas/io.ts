import type {ChatMessage, ChatMessageId, ReactToMessage, SentChatMessage, Username} from "@/app/schemas/chat";
import {Server} from "socket.io";

export type ClientToServerEvents = {
    'message.sent': (msg: SentChatMessage) => void
    'message.typing.started': () => void
    'message.typing.stopped': () => void
    'message.react': (react: ReactToMessage) => void
    'message.unreact': (messageId: ChatMessageId) => void
}

export type ServerToClientEvents = {
    'message.all': (messages: Array<ChatMessage>) => void
    'message.received': (message: ChatMessage) => void
    'message.typing': (typingAuthors: Array<Username>) => void
    'message.updated': (message: ChatMessage) => void
}

export type InterServerEvents = {}

export type SocketData = {}

export type IOServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>