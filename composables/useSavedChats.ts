import {useLocalStorage} from "@vueuse/core";
import {localStorageKey} from "@/app/localStorage";
import type {ChatId} from "@/app/classes/Chat";

const SAVED_CHATS_LOCAL_STORAGE_KEY = 'saved-chats';
export const useSavedChats = () => {
    const savedChats = useLocalStorage<Array<ChatId>>(
        localStorageKey(SAVED_CHATS_LOCAL_STORAGE_KEY),
        []
    )

    const saveChat = (chatIdToAdd: ChatId) => {
        if (toValue(savedChats).includes(chatIdToAdd)) {
            return
        }
        savedChats.value.unshift(chatIdToAdd)
    }

    const forgetChat = (chatIdToRemove: ChatId) => {
        savedChats.value = toValue(savedChats).filter(chatId => chatId !== chatIdToRemove)
    }

    return {
        savedChats,
        saveChat,
        forgetChat
    }
}