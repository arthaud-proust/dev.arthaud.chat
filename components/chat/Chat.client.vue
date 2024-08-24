<template>
    <div class="flex flex-col h-screen">
        <div class="py-4 flex gap-2 items-center">
            <UButton
                to="/"
                icon="i-heroicons-arrow-left"
                variant="ghost"
            />

            <div class="flex flex-wrap grow items-center justify-between gap-2">
                <span>#{{ room }}</span>

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

        <div class="py-4 flex flex-col-reverse grow overflow-y-auto pr-4">
            <ChatMessageCard
                v-for="(message, index) in displayedMessages"
                :key="message.id"
                :message="message"
                :previous-message="displayedMessages[index+1]"
                :next-message="displayedMessages[index-1]"
            />
        </div>

        <div class="py-4 flex gap-2 items-start">
            <UTextarea
                class="grow"
                autoresize
                :rows="1"
                :maxrows="4"
                size="lg"
                v-model="messageContent"
                placeholder="Message..."
                autocomplete="off"
                @keyup.shift.enter="sendMessage"
            >
            </UTextarea>

            <UButton
                :disabled="isBlank(messageContent)"
                size="lg"
                variant="solid"
                icon="i-heroicons-paper-airplane-20-solid"
                @click="sendMessage"
            />
        </div>

        <EditUsernameModal v-model:opened="isEditUsernameModalOpen" />
    </div>
</template>

<script setup lang="ts">
import ChatMessageCard from "@/components/chat/ChatMessageCard.vue";
import EditUsernameModal from "@/components/chat/EditUsernameModal.vue"
import {useChat} from "@/composables/useChat";

const {username, isUsernameBlank} = useUsername()
const {params} = useRoute();
const room = params.room as string;

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank))

const {
    sendMessage,
    messages,
    messageContent,
    isConnected,
    transport
} = useChat(room)

const displayedMessages = computed(() => toValue(messages).toReversed())
</script>