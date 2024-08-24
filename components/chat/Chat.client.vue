<template>
    <div class="flex flex-col h-screen">
        <div class="py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <NuxtLink to="/">
                    <UButton
                        icon="i-heroicons-chevron-left"
                        variant="ghost"
                    />
                </NuxtLink>

                <span>#{{ room }}</span>
            </div>

            <UBadge v-if="isConnected" color="green" variant="soft">Connected via {{ transport }}</UBadge>
            <UBadge v-else color="red">Disconnected</UBadge>
        </div>

        <div class="py-4 flex flex-col-reverse gap-4 grow overflow-y-auto pr-4">
            <ChatMessageCard
                v-for="message in messages.toReversed()"
                :key="message.id"
                :message="message"
            />
        </div>

        <div class="py-4 flex gap-2 items-start">
            <UTextarea
                class="grow"
                autoresize
                :rows="1"
                :maxrows="4"
                size="lg"
                v-model="messageToSend"
                placeholder="Message..."
                autocomplete="off"
                @keyup="handleKeyUp"
            >
            </UTextarea>

            <UButton
                :disabled="isBlank(messageToSend)"
                size="lg"
                variant="solid"
                icon="i-heroicons-paper-airplane-20-solid"
                @click="sendMessage"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import ChatMessageCard from "@/components/chat/ChatMessageCard.vue";
import {useChat} from "@/composables/useChat";

const {params} = useRoute();
const room = params.room as string;

const {
    sendMessage,
    messages,
    messageToSend,
    isConnected,
    transport
} = useChat(room)

const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault();

        sendMessage()
    }
}
</script>