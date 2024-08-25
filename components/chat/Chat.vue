<template>
    <div ref="refContainer" class="h-screen overflow-y-auto overscroll-none">
        <UContainer class="min-h-screen" :ui="{constrained: 'max-w-xl'}">
            <div ref="refInner" class="relative flex flex-col items-center">
                <div class="sticky top-0 w-full h-14 shrink-0 bg-white flex gap-2 items-center">
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
                </div>

                <div class="w-full py-4 flex flex-col-reverse">
                    <ChatMessageCard
                        v-for="(message, index) in displayedMessages"
                        :key="message.id"
                        :message="message"
                        :previous-message="displayedMessages[index+1]"
                        :next-message="displayedMessages[index-1]"
                    />
                </div>

                <div class="sticky bottom-0 w-full h-14 shrink-0 bg-white flex gap-2 items-center">
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

                <EditUsernameModal v-model:opened="isEditUsernameModalOpen" />
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import ChatMessageCard from "@/components/chat/ChatMessageCard.vue";
import EditUsernameModal from "@/components/chat/EditUsernameModal.vue"
import {useChat} from "@/composables/useChat";
import type {ChatId} from "@/app/classes/Chat";
import type {UTextarea} from "#components";
import {useElementSize, useScroll} from "@vueuse/core";

const props = defineProps<{
    chatId: ChatId
}>()

const {username, isUsernameBlank} = useUsername()

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank))

const refContainer = ref<HTMLElement>()
const refInner = ref<HTMLElement>()
const containerScroll = useScroll(refContainer)
const innerSize = useElementSize(refInner)

const refUTextarea = ref<typeof UTextarea>()
const {
    sendMessage,
    canSendMessage,
    messages,
    messageContent,
    isConnected,
    transport
} = useChat(props.chatId)

const sendMessageAndFocusAgain = () => {
    sendMessage()
    toValue(refUTextarea)?.textarea.focus()
}

const displayedMessages = computed(() => toValue(messages).toReversed())
watch(displayedMessages, async () => {
    await nextTick()
    console.log(toValue(innerSize.height))
    containerScroll.y.value = toValue(innerSize.height)
})
</script>