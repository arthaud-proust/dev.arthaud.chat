import {useSocket} from "@/composables/useSocket";
import type {ChatMessage, SentChatMessage} from "@/app/schemas/chat";
import {SentChatMessageSchema} from "@/app/schemas/chat";
import {useSavedChats} from "@/composables/useSavedChats";
import type {ChatId} from "@/app/classes/Chat";

const EMPTY_CURRENT_MESSAGE = "";
export const useChat = (chatId: ChatId) => {
    const {saveChat} = useSavedChats();
    const {username, isUsernameBlank} = useUsername()
    const {
        socket,
        transport,
        isConnected
    } = useSocket({
        query: {
            chatId
        }
    })

    let currentClientId = 0;
    const messages = ref<Array<ChatMessage>>([]);
    const sentMessages = ref<Array<SentChatMessage>>([]);
    const messageContent = ref<string>(EMPTY_CURRENT_MESSAGE);

    socket.on("connect", () => {
        saveChat(chatId)
    })

    socket.on('message.all', (allMessages) => {
        messages.value = allMessages
    })
    socket.on('message.received', (message) => {
        messages.value.push(message)

        sentMessages.value = toValue(sentMessages).filter(sentMessage => !(
            sentMessage.author === message.author
            && sentMessage.clientId === message.clientId
        ))

        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    })

    const canSendMessage = computed(() => !isBlank(toValue(messageContent)) && !toValue(isUsernameBlank))

    const sendMessage = () => {
        if (!toValue(canSendMessage)) {
            return
        }

        const message = SentChatMessageSchema.parse({
            clientId: currentClientId,
            author: toValue(username),
            content: toValue(messageContent)
        })

        sentMessages.value.push(message)

        socket.emit('message.sent', message);

        messageContent.value = EMPTY_CURRENT_MESSAGE;
        currentClientId++
    }

    return {
        messages,
        sentMessages,
        messageContent,
        canSendMessage,
        sendMessage,
        transport,
        isConnected
    }
}