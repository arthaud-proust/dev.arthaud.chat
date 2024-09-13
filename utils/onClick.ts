const CLICKS_COUNT_TO_CALL_BACK = 2;
const DOUBLE_CLICK_DURATION_MS = 400;
const LONG_PRESS_DURATION_MS = 200;

export const useOnClick = (
    {
        onDoubleClick,
        onLongPress,
    }: {
        onDoubleClick: (e: Event) => void;
        onLongPress: (e: Event) => void;
    }
) => {
    let longPressTimeout: NodeJS.Timeout | undefined;

    let doubleClickTimeout: NodeJS.Timeout | undefined;
    let clickCount = 0;

    const resetClickCount = () => clickCount = 0;
    const isDoubleClick = (count: number) => count >= CLICKS_COUNT_TO_CALL_BACK


    const startClick = (e: Event) => {
        clearTimeout(longPressTimeout)
        clearTimeout(doubleClickTimeout)

        clickCount++

        if (isDoubleClick(clickCount)) {
            resetClickCount()
            onDoubleClick(e)
        } else {
            longPressTimeout = setTimeout(() => onLongPress(e), LONG_PRESS_DURATION_MS)
            doubleClickTimeout = setTimeout(resetClickCount, DOUBLE_CLICK_DURATION_MS)
        }
    }

    const endClick = (e: Event) => {
        clearTimeout(longPressTimeout)
    }

    return {
        startClick,
        endClick
    }
}