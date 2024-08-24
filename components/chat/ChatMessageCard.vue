<template>
    <div
        class="mt-1 flex flex-col"
        :class="[
            isMessageFromMyself ? 'items-end' :'items-start',
            ]"
    >
        <p
            v-if="!previousMessageFromSameAuthor"
            class="w-full text-neutral-500 text-xs text-center py-6"
        >
            {{ messageTime }}
        </p>

        <div
            class="flex flex-col gap-1 max-w-72 md:max-w-96"
        >
            <p
                class="text-neutral-500 text-sm px-1"
                v-if="!isMessageFromMyself && !previousMessageFromSameAuthor"
            >
                {{ message.author }}
            </p>
            <div
                class="grow px-4 py-3 bg-neutral-50 rounded-xl"
            >
                <p>{{ message.content }}</p>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import type {ChatMessage} from "@/app/schemas/chat";

const {username} = useUsername()

const props = defineProps<{
    message: ChatMessage
    nextMessage?: ChatMessage
    previousMessage?: ChatMessage
}>()

const isMessageFromMyself = computed(() => props.message.author === toValue(username))
const previousMessageFromSameAuthor = computed(() => props.previousMessage?.author === props.message.author)
const nextMessageFromSameAuthor = computed(() => props.nextMessage?.author === props.message.author)

const messageTime = computed(() => {
    const date = new Date(props.message.at)

    return `${date.getHours()}:${date.getMinutes()}`
})
</script>