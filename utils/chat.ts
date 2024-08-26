import type {ChatId} from "@/app/schemas/chat";

export const stringifyChatId = (chatId: string) => chatId.trim().toLowerCase().replace(/\W/g, '-')
export const humanizeChatId = (chatId: ChatId) => chatId.replace('-', ' ')
