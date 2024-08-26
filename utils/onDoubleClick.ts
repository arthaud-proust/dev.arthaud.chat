const CLICKS_COUNT_TO_CALL_BACK = 2;
export const onDoubleClick = (callback: Function, msDelay: number = 500) => {
    let clickCount = 0;
    let timeout: NodeJS.Timeout | undefined;

    const resetClickCount = () => clickCount = 0;
    const isDoubleClick = (count: number) => count >= CLICKS_COUNT_TO_CALL_BACK

    return () => {
        clearTimeout(timeout)

        clickCount++

        if (isDoubleClick(clickCount)) {
            resetClickCount()
            callback()
        } else {
            timeout = setTimeout(resetClickCount, msDelay)
        }
    }
}