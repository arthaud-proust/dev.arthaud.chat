<template>
    <UContainer class="min-h-screen" :ui="{constrained: 'max-w-xl'}">
        <div class="flex flex-col justify-center items-center">
            <Head>
                <Title>Chat</Title>
            </Head>
            <header class="w-full h-14 flex items-center justify-end">
                <UButton
                    variant="ghost"
                    trailing-icon="i-heroicons-user-20-solid"
                    v-if="!isUsernameBlank"
                    @click="isEditUsernameModalOpen=true"
                >
                    {{ username }}
                </UButton>
                <EditUsernameModal v-model:opened="isEditUsernameModalOpen" />

            </header>
            <div class="min-h-screen flex flex-col justify-center items-center gap-2 w-full">
                <UInput
                    autofocus
                    size="lg"
                    v-model="chatToJoinId"
                    placeholder="E.g. magic-cow"
                    autocomplete="off"
                    :ui="{ icon: { trailing: { pointer: '' } } }"
                    @keyup.enter="joinChat"
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
            </div>

            <div v-if="savedChats.length" class="-mt-24 w-full flex flex-col gap-2 pb-4">
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
    </UContainer>
</template>
<script setup lang="ts">
import {generate} from "random-words";
import EditUsernameModal from "@/components/chat/EditUsernameModal.vue";
import {stringifyChatId} from "@/utils/chat";

const {username, isUsernameBlank} = useUsername()
const {savedChats, forgetChat} = useSavedChats()

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank));

const newChatId = (generate(2) as [string, string]).join('-')
const newChatUrl = `/chat/${newChatId}`

const chatToJoinId = ref<string>()
const joinChat = () => {
    const chatToJoinIdValue = stringifyChatId(toValue(chatToJoinId) ?? '')

    if (!isBlank(chatToJoinIdValue)) {
        navigateTo(`/chat/${chatToJoinIdValue}`)
    }
}

</script>