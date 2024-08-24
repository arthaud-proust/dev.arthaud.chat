import type {ChatId} from "@/app/classes/Chat";

export const humanizeChatId = (chatId: ChatId) => chatId.replace('-', ' ')
