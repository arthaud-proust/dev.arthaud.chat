import type {ChatMessage, SentChatMessage, Username} from "@/app/schemas/chat";

export type ClientToServerEvents = {
    'message.sent': (msg: SentChatMessage) => void
    'message.typing.started': () => void
    'message.typing.stopped': () => void
}

export type ServerToClientEvents = {
    'message.all': (messages: Array<ChatMessage>) => void
    'message.received': (message: ChatMessage) => void
    'message.typing': (typingAuthors: Array<Username>) => void
}

export type InterServerEvents = {}

export type SocketData = {}