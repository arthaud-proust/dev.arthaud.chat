<template>
    <main ref="refContainer" class="h-screen overflow-y-auto overscroll-none">
        <UContainer :ui="{constrained: 'max-w-xl'}">
            <div ref="refInner" class="min-h-screen relative flex flex-col items-center">
                <header class="sticky top-0 w-full h-14 shrink-0 bg-white flex gap-2 items-center">
                    <UButton
                        to="/"
                        icon="i-heroicons-arrow-left"
                        variant="ghost"
                    />

                    <div class="flex flex-wrap grow items-center justify-between gap-2">
                        <span class="capitalize">{{ humanizeChatId(chatId) }}</span>

                        <UButton
                            v-if="isConnected"
                            color="green"
                            variant="soft"
                            @click="isEditUsernameModalOpen=true"
                        >
                            Connected via {{ transport }} as {{ username }}
                        </UButton>
                        <UBadge
                            v-else
                            color="red"
                            variant="soft"
                        >
                            Disconnected
                        </UBadge>
                    </div>
                </header>

                <section class="grow w-full py-4 flex flex-col-reverse">
                    <ChatSentMessageCard
                        v-for="(message, index) in displayedSentMessages"
                        :key="message.clientId"
                        :message="message"
                        :previous-message="displayedSentMessages[index+1]"
                    />
                    <ChatMessageCard
                        v-for="(message, index) in displayedMessages"
                        :key="message.id"
                        :message="message"
                        :previous-message="displayedMessages[index+1]"
                    />
                </section>

                <footer class="sticky bottom-0 w-full flex flex-col items-center gap-2">
                    <UButton
                        v-if="displayNewMessageBtn"
                        variant="soft"
                        :ui="{ rounded: 'rounded-full' }"
                        trailing-icon="i-heroicons-arrow-down-20-solid"
                        @click="scrollToEnd"
                    >
                        New message
                    </UButton>

                    <div class="w-full py-2 shrink-0 bg-white flex gap-2 items-start">
                        <UTextarea
                            ref="refUTextarea"
                            autofocus
                            class="grow"
                            autoresize
                            :rows="1"
                            :maxrows="4"
                            size="lg"
                            v-model="messageContent"
                            placeholder="Message..."
                            autocomplete="off"
                            @keyup.shift.enter="sendMessageAndFocusAgain"
                            @click="scrollToEnd"
                        >
                        </UTextarea>

                        <UButton
                            :disabled="!canSendMessage"
                            size="lg"
                            variant="solid"
                            icon="i-heroicons-paper-airplane-20-solid"
                            @click="sendMessageAndFocusAgain"
                        />
                    </div>
                </footer>

                <EditUsernameModal v-model:opened="isEditUsernameModalOpen" />
            </div>
        </UContainer>
    </main>
</template>

<script setup lang="ts">
import ChatMessageCard from "@/components/chat/ChatMessageCard.vue";
import EditUsernameModal from "@/components/chat/EditUsernameModal.vue"
import {useChat} from "@/composables/useChat";
import type {ChatId} from "@/app/classes/Chat";
import type {UTextarea} from "#components";
import ChatSentMessageCard from "@/components/chat/ChatSentMessageCard.vue";

const props = defineProps<{
    chatId: ChatId
}>()

const {username, isUsernameBlank} = useUsername()

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank))

const refContainer = ref<HTMLElement>()
const refInner = ref<HTMLElement>()

const refUTextarea = ref<typeof UTextarea>()
const {
    sendMessage,
    canSendMessage,
    messages,
    sentMessages,
    messageContent,
    isConnected,
    transport
} = useChat(props.chatId)

const sendMessageAndFocusAgain = async () => {
    sendMessage()
    toValue(refUTextarea)?.textarea.focus()
    await scrollToEnd()
}

const scrollToEnd = async () => {
    displayNewMessageBtn.value = false
    await nextTick()
    if (refContainer.value) {
        refContainer.value.scrollTop = refContainer.value.scrollHeight
    }
}

const displayNewMessageBtn = ref(false)
const displayedMessages = computed(() => toValue(messages).toReversed())
const displayedSentMessages = computed(() => toValue(sentMessages).toReversed())

const MAX_BOTTOM_DISTANCE_TO_SCROLL_END = 200

watch(displayedMessages, (value, oldValue) => {
    if (value.length > 0 && oldValue.length === 0) {
        scrollToEnd()
    }

    if (refContainer.value) {
        const bottomDistance = refContainer.value.scrollHeight - refContainer.value.clientHeight - refContainer.value.scrollTop
        console.log(bottomDistance)
        if (bottomDistance < MAX_BOTTOM_DISTANCE_TO_SCROLL_END) {
            scrollToEnd()
        } else {
            displayNewMessageBtn.value = true
        }
    }
})
</script>