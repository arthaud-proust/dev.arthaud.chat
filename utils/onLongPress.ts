export const onLongPress = (callback: Function, msDelay: number = 200) => {
    let timeout: NodeJS.Timeout | undefined;

    const startPress = (e: Event) => {
        clearTimeout(timeout)

        timeout = setTimeout(callback, msDelay)
    }

    const stopPress = (e: Event) => {
        clearTimeout(timeout)
    }

    return {
        startPress,
        stopPress
    }
}