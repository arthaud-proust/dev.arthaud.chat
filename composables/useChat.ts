import {useSocket} from "@/composables/useSocket";
import type {ChatMessage} from "@/app/schemas/chat";
import {SentChatMessageSchema} from "@/app/schemas/chat";
import {useSavedChats} from "@/composables/useSavedChats";
import type {ChatId} from "@/app/classes/Chat";

const EMPTY_CURRENT_MESSAGE = "";
export const useChat = (chatId: ChatId) => {
    const {saveChat} = useSavedChats();
    const {username} = useUsername()
    const {
        socket,
        transport,
        isConnected
    } = useSocket({
        query: {
            chatId
        }
    })
    const messages = ref<Array<ChatMessage>>([]);
    const messageContent = ref<string>(EMPTY_CURRENT_MESSAGE);

    socket.on("connect", () => {
        saveChat(chatId)
    })

    socket.on('message.all', (allMessages) => {
        messages.value = allMessages
    })
    socket.on('message.received', (message) => {
        messages.value.push(message)
    })

    const sendMessage = () => {
        const message = SentChatMessageSchema.parse({
            author: toValue(username),
            content: toValue(messageContent)
        })

        socket.emit('message.sent', message);

        messageContent.value = EMPTY_CURRENT_MESSAGE;
    }

    return {
        messages,
        messageContent,
        sendMessage,
        socket,
        transport,
        isConnected
    }
}