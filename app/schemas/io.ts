import type {ChatMessage, SentChatMessage} from "@/app/schemas/chat";

export type ClientToServerEvents = {
    'message.sent': (msg: SentChatMessage) => void
}

export type ServerToClientEvents = {
    'message.all': (messages: Array<ChatMessage>) => void
    'message.received': (message: ChatMessage) => void
}

export type InterServerEvents = {}

export type SocketData = {}