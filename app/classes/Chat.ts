import type {ChatMessage, SentChatMessage} from "@/app/schemas/chat";

export type ChatId = string

export class Chat {
    readonly id: ChatId;
    private messages: Array<ChatMessage> = []

    constructor(id: ChatId) {
        this.id = id;
    }

    allMessages() {
        return [...this.messages]
    }

    addMessage({content, author}: SentChatMessage) {
        const message: ChatMessage = {
            id: this.nextId(),
            author: author.trim(),
            content: content.trim(),
            at: (new Date()).toISOString()
        }

        this.messages.push(message)

        return message
    }

    private nextId() {
        const lastMessage = this.lastMessage()

        return lastMessage ? lastMessage.id + 1 : 0
    }

    private lastMessage() {
        if (this.messages.length === 0) {
            return undefined
        }

        return this.messages[this.messages.length - 1]
    }
}