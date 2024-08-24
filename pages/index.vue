<template>
    <div class="min-h-screen flex flex-col justify-center items-center">
        <div class="min-h-screen flex flex-col justify-center items-center gap-2 w-full">
            <ClientOnly>
                <UInput
                    size="lg"
                    v-model="chatToJoinId"
                    placeholder="E.g. magic-cow"
                    autocomplete="off"
                    :ui="{ icon: { trailing: { pointer: '' } } }"
                >
                    <template #trailing>
                        <UButton
                            :disabled="isBlank(chatToJoinId)"
                            color="gray"
                            variant="link"
                            :padded="false"
                            @click="joinChat"
                        >
                            Join
                        </UButton>
                    </template>
                </UInput>
                <p class="text-center">Or</p>
                <UButton
                    :to="newChatUrl"
                    icon="i-heroicons-chat-bubble-left-right"
                    size="lg"
                    label="Create a new chat!"
                    :trailing="true"
                />
            </ClientOnly>
        </div>

        <div v-if="savedChats.length" class="-mt-20 w-full flex flex-col gap-2 pb-4">
            <p class="text-center">Saved chats</p>
            <UCard
                class="relative"
                v-for="chatId in savedChats"
                :key="chatId"
            >
                <NuxtLink :to="`/chat/${chatId}`" class="absolute inset-0" />
                <div class="flex items-center justify-between gap-2">
                    <p class="capitalize">{{ humanizeChatId(chatId) }}</p>

                    <UButton
                        variant="ghost"
                        color="red"
                        icon="i-heroicons-trash"
                        size="md"
                        @click="forgetChat(chatId)"
                    />
                </div>
            </UCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import {generate} from "random-words";
import type {ChatId} from "@/app/classes/Chat";

const {savedChats, forgetChat} = useSavedChats()


const newChatId = (generate(2) as [string, string]).join('-')
const newChatUrl = `/chat/${newChatId}`

const chatToJoinId = ref<string>()
const joinChat = () => {
    const chatToJoinIdValue = toValue(chatToJoinId)

    if (!isBlank(chatToJoinIdValue)) {
        navigateTo(`/chat/${chatToJoinIdValue}`)
    }
}

const humanizeChatId = (chatId: ChatId) => chatId.replace('-', ' ')
</script>