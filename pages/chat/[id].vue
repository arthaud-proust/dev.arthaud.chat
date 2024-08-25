<template>
    <Chat :chat-id="chatId" />
</template>
<script setup lang="ts">
import Chat from "@/components/chat/Chat.vue"

const {params} = useRoute();
const chatId = params.id as string;

useHead({
    title: humanizeChatId(chatId)
})
</script>