<template>
    <div>
        <EditUsernameModal v-model:opened="isEditUsernameModalOpen" />

        <Chat v-if="username && !isUsernameBlank && !isEditUsernameModalOpen" :chat-id="chatId" :username="username" />
    </div>
</template>
<script setup lang="ts">
import Chat from "@/components/chat/Chat.vue"
import EditUsernameModal from "@/components/chat/EditUsernameModal.vue";

const {params} = useRoute();
const chatId = params.id as string;

const {username, isUsernameBlank} = useUsername()

useHead({
    title: humanizeChatId(chatId)
})

const isEditUsernameModalOpen = ref(toValue(isUsernameBlank));
</script>