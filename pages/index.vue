<template>
    <div class="min-h-screen flex flex-col justify-center">
        <div>
            <ClientOnly>
                <NuxtLink :to="newChatUrl">
                    <UButton
                        icon="i-heroicons-chat-bubble-left-right"
                        size="md"
                        label="Create a new chat!"
                        :trailing="true"
                    />
                </NuxtLink>
            </ClientOnly>
        </div>
    </div>
</template>
<script setup lang="ts">
import {generate} from "random-words";

const newChatId = (generate(2) as [string, string]).join('-')
const newChatUrl = `/chat/${newChatId}`
</script>