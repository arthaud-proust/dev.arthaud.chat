import type {ChatId, ChatMessage, SentChatMessage, Username} from "@/app/schemas/chat";


export class Chat {
    readonly id: ChatId;
    private messages = new Array<ChatMessage>()
    private typingAuthors = new Set<Username>()

    constructor(id: ChatId) {
        this.id = id;
    }

    allTypingAuthors() {
        return [...this.typingAuthors]
    }

    allMessages() {
        return [...this.messages]
    }

    sendMessage(author: Username, {clientId, content}: SentChatMessage) {
        const message: ChatMessage = {
            clientId,
            author,
            content: content.trim(),
            id: this.nextId(),
            at: (new Date()).toISOString()
        }

        this.messages.push(message)

        return message
    }

    startTyping(author: Username): void {
        this.typingAuthors.add(author)
    }

    stopTyping(author: Username): void {
        this.typingAuthors.delete(author)
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