import type {ChatId, ChatMessage, ChatMessageId, ReactToMessage, SentChatMessage, Username} from "@/app/schemas/chat";


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
            at: (new Date()).toISOString(),
            reactions: {}
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

    react(author: Username, {messageId, reaction}: ReactToMessage) {
        const message = this.findMessage(messageId)

        message.reactions[author] = reaction

        return message
    }

    unreact(author: Username, messageId: ChatMessageId) {
        const message = this.findMessage(messageId)

        delete message.reactions[author]

        return message
    }

    private findMessage(messageId: ChatMessageId): ChatMessage {
        const message = this.messages.find(message => message.id === messageId)

        if (!message) throw new Error(`${messageId} not found`)

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