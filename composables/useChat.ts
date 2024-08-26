import {useSocket} from "@/composables/useSocket";
import type {ChatId, ChatMessage, ChatMessageId, ChatMessageReaction, SentChatMessage, Username} from "@/app/schemas/chat";
import {ChatMessageIdSchema, ReactToMessageSchema, SentChatMessageSchema} from "@/app/schemas/chat";
import {useSavedChats} from "@/composables/useSavedChats";

const EMPTY_CURRENT_MESSAGE = "";

export type UseChatProps = {
    chatId: ChatId;
    username: Username
}
export const useChat = ({chatId, username}: UseChatProps) => {
    const {saveChat} = useSavedChats();
    const {
        socket,
        transport,
        isConnected
    } = useSocket({
        query: {
            chatId,
            username
        }
    })

    let currentClientId = 0;
    const typingAuthors = ref<Array<Username>>([]);
    const messages = ref<Array<ChatMessage>>([]);
    const sentMessages = ref<Array<SentChatMessage>>([]);
    const messageContent = ref<string>(EMPTY_CURRENT_MESSAGE);

    const STOP_TYPING_TIMEOUT = 1_000;
    const stopTyping = () => {
        socket.emit('message.typing.stopped')
        stopTypingTimeoutHandler = undefined
    }
    let stopTypingTimeoutHandler: NodeJS.Timeout | undefined;

    watch(messageContent, () => {
        if (stopTypingTimeoutHandler) {
            clearTimeout(stopTypingTimeoutHandler);
        } else {
            socket.emit('message.typing.started')
        }

        stopTypingTimeoutHandler = setTimeout(stopTyping, STOP_TYPING_TIMEOUT)
    })

    socket.on("connect", () => {
        saveChat(chatId)
    })

    socket.on('message.all', (allMessages) => {
        messages.value = allMessages
    })

    socket.on('message.received', (message) => {
        messages.value.push(message)

        if (message.author === username) {
            sentMessages.value = toValue(sentMessages).filter(
                sentMessage => sentMessage.clientId !== message.clientId
            )
        }
    })

    socket.on('message.typing', (authors) => {
        typingAuthors.value = authors.filter(author => author !== username)
    })

    socket.on('message.updated', (updatedMessage) => {
        const sourceMessage = toValue(messages).find((message) => message.id === updatedMessage.id)

        if (!sourceMessage) {
            throw new Error(`${updatedMessage.id} not found`)
        }

        Object.assign(
            sourceMessage,
            updatedMessage
        )
    })

    const canSendMessage = computed(() => !isBlank(toValue(messageContent)))

    const sendMessage = () => {
        if (!toValue(canSendMessage)) {
            return
        }

        const message = SentChatMessageSchema.parse({
            clientId: currentClientId,
            content: toValue(messageContent)
        })

        messageContent.value = EMPTY_CURRENT_MESSAGE;
        stopTyping()
        currentClientId++

        sentMessages.value.push(message)

        socket.emit('message.sent', message);
    }

    const reactToMessage = (messageId: ChatMessageId, reaction: ChatMessageReaction) => {
        socket.emit('message.react', ReactToMessageSchema.parse({
            messageId,
            reaction
        }))
    }
    const unreactToMessage = (messageId: ChatMessageId) => {
        socket.emit('message.unreact', ChatMessageIdSchema.parse(messageId))
    }

    return {
        messageContent,
        canSendMessage,
        sendMessage,
        reactToMessage,
        unreactToMessage,

        messages: readonly(messages),
        sentMessages: readonly(sentMessages),
        typingAuthors: readonly(typingAuthors),
        transport: readonly(transport),
        isConnected: readonly(isConnected)
    }
}