import {useSocket} from "@/composables/useSocket";
import type {ChatMessage} from "@/app/schemas/chat";

const EMPTY_CURRENT_MESSAGE = "";
export const useChat = (room: string) => {
    const {
        socket,
        transport,
        isConnected
    } = useSocket({
        query: {
            room
        }
    })
    const messages = ref<Array<ChatMessage>>([]);
    const messageToSend = ref<string>(EMPTY_CURRENT_MESSAGE);

    socket.on('message.all', (allMessages) => {
        messages.value = allMessages
    })
    socket.on('message.received', (message) => {
        messages.value.push(message)
    })

    const sendMessage = () => {
        if (isBlank(toValue(messageToSend))) {
            return
        }

        socket.emit('message.sent', {
            content: toValue(messageToSend)
        });

        messageToSend.value = EMPTY_CURRENT_MESSAGE;
    }

    return {
        messages,
        messageToSend,
        sendMessage,
        socket,
        transport,
        isConnected
    }
}