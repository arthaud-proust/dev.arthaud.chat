import {Chat} from "@/app/classes/Chat";
import type {ChatId} from "@/app/schemas/chat";

export class ChatManager {
    private chats = new Map<ChatId, Chat>();

    firstOrCreate(chatId: ChatId) {
        return this.chats.get(chatId) ?? this.create(chatId);
    }

    create(chatId: ChatId) {
        const chat = new Chat(chatId)

        this.chats.set(chatId, chat)

        return chat
    }

    delete(chatId: ChatId) {
        this.chats.delete(chatId)
    }
}