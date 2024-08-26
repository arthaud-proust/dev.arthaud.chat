<template>
    <div
        class="mt-1 flex flex-col items-end"
    >
        <div
            class="flex flex-col gap-1 max-w-72 md:max-w-96"
        >
            <p
                class="text-neutral-500 text-xs px-1"
                v-if="!previousMessage"
            >
                Sending...
            </p>

            <p class="grow px-4 py-3 bg-neutral-50 rounded-xl">{{ message.content }}</p>
        </div>
    </div>

</template>
<script setup lang="ts">
import type {SentChatMessage} from "@/app/schemas/chat";

const props = defineProps<{
    message: SentChatMessage
    previousMessage?: SentChatMessage
}>()
</script>