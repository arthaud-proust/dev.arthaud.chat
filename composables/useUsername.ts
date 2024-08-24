import {useLocalStorage} from "@vueuse/core";
import {localStorageKey} from "@/app/localStorage";

export const useUsername = () => {
    const username = useLocalStorage<string | undefined>(
        localStorageKey('username'),
        undefined
    )

    const isUsernameBlank = computed(() => isBlank(toValue(username)))

    return {
        username,
        isUsernameBlank
    }
}