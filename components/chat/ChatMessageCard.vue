<template>
    <div
        class="w-full flex items-start gap-x-4"
        :class="true ? 'flex-row-reverse' :'flex-row' "
    >
        <USkeleton class="size-12" :ui="{ rounded: 'rounded-full' }" />

        <UCard :ui="{body: {base:'space-y-2'}}" class="grow ">
            <p>{{ message.content }}</p>
        </UCard>

        <div class="size-12"></div>
    </div>
</template>
<script setup lang="ts">

import type {ChatMessage} from "@/app/schemas/chat";

const props = defineProps<{
    message: ChatMessage
}>()
</script>