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
            class="select-none flex flex-col gap-1 max-w-72 md:max-w-96"
        >
            <p
                class="text-neutral-500 text-sm px-1"
                v-if="!isMessageFromMyself && !previousMessageFromSameAuthor"
            >
                {{ message.author }}
            </p>
            <div
                @click="bdlClickReact"
                class="grow px-3 py-2 bg-white border rounded-3xl"
            >
                <p>{{ message.content }}</p>
            </div>
            <div v-if="hasReaction" class="text-sm rounded-full bg-neutral-100 border-2 border-white py-0.5 px-1.5 flex gap-1 ml-2 mr-auto -mt-2">
                <div
                    class="flex gap-0.5"
                    v-for="(users, reaction) in reactions"
                >
                    <span>{{ reaction }}</span>
                    <span v-if="users.length > 1">{{ users.length }}</span>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import type {ChatMessage, ChatMessageReaction, Username} from "@/app/schemas/chat";
import {onDoubleClick} from "@/utils/onDoubleClick";

const {username} = useUsername()

const props = defineProps<{
    message: ChatMessage
    previousMessage?: ChatMessage
}>()

const emit = defineEmits<{
    unreact: []
    react: [reaction: ChatMessageReaction]
}>()

const isMessageFromMyself = computed(() => props.message.author === toValue(username))
const previousMessageFromSameAuthor = computed(() => props.previousMessage?.author === props.message.author)

const messageTime = computed(() => {
    const date = new Date(props.message.at)
    const f = (n: number) => String(n).padStart(2, "0")

    return `${f(date.getHours())}:${f(date.getMinutes())}`
})

const handleReact = () => {
    const userAlreadyReacted = Object.keys(props.message.reactions).includes(toValue(username)!)

    userAlreadyReacted
        ? emit('unreact')
        : emit('react', '❤️')
}
const bdlClickReact = onDoubleClick(handleReact)

const hasReaction = computed(() => Object.keys(props.message.reactions).length > 0)

const reactions = computed(() => {
    const count: Record<ChatMessageReaction, Array<Username>> = {}

    Object.entries(props.message.reactions).forEach(([author, reaction]) => {
        if (!count[reaction]) count[reaction] = []

        count[reaction].push(author)
    })

    return count
})
</script>