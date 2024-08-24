<template>
    <UModal :ui="{base:'w-80'}" v-model="opened" :prevent-close="isUsernameBlank">
        <UCard :ui="{body: {base:'space-y-2'}}">
            <UFormGroup
                size="md"
                label="What's your name ?"
                :error="isUsernameBlank && 'You must enter a username'"
            >
                <UInput
                    placeholder="John Doe"
                    v-model="username"
                    @keyup.enter="closeIfCan"
                />
            </UFormGroup>

            <div class="w-full flex justify-end">
                <UButton
                    size="md"
                    :disabled="isUsernameBlank"
                    @click="closeIfCan"
                    color="green"
                >
                    Save
                </UButton>
            </div>

        </UCard>
    </UModal>
</template>
<script setup lang="ts">
import {useUsername} from "@/composables/useUsername";

const {
    username,
    isUsernameBlank
} = useUsername()

const opened = defineModel<boolean>('opened', {
    required: true
})
const closeIfCan = () => {
    if (toValue(isUsernameBlank)) {
        return
    }

    opened.value = false
}
</script>