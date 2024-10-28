import * as React from 'react'

const Timer = (numberOfSeconds, storageIdString) => {
    const initialTimer = parseInt(localStorage.getItem("timer") ?? numberOfSeconds);
    const timeoutId = React.useRef(null);
    const [timer, setTimer] = React.useState(initialTimer);

    const countTimer = React.useCallback(() => {
        if (timer <= 0) {
            localStorage.removeItem(storageIdString);
        } else {
            setTimer(timer - 1);
            localStorage.setItem(storageIdString, timer);
        }
    }, [timer]);

    React.useEffect(() => {
        timeoutId.current = window.setTimeout(countTimer, 1000);
        // cleanup function
        return () => window.clearTimeout(timeoutId.current);
    }, [timer, countTimer]);

    return <div align="center">Timer :{timer}</div>;
}

export default Timer