import {useLocalStorage} from "@vueuse/core";
import {localStorageKey} from "@/app/localStorage";

const USERNAME_LOCAL_STORAGE_KEY = 'username';
export const useUsername = () => {
    const username = useLocalStorage<string | undefined>(
        localStorageKey(USERNAME_LOCAL_STORAGE_KEY),
        undefined
    )

    const isUsernameBlank = computed(() => isBlank(toValue(username)))

    return {
        username,
        isUsernameBlank
    }
}