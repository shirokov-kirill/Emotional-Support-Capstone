import * as React from 'react'

const Timer = (props) => {
    const initialTimer = parseInt(localStorage.getItem("timer") ?? props['numberOfSeconds']);
    const text = props['text'];
    const storageId = props['storageIdString'];
    const onTimerEnds = props['onTimerEnds'];
    const timeoutId = React.useRef(null);
    const [timer, setTimer] = React.useState(initialTimer);

    const countTimer = () => {
        if (timer <= 0) {
            localStorage.removeItem(storageId);
            onTimerEnds();
        } else {
            setTimer(timer - 1);
            localStorage.setItem(storageId, timer.toString());
        }
    };

    React.useEffect(() => {
        timeoutId.current = window.setTimeout(countTimer, 1000);
        // cleanup function
        return () => window.clearTimeout(timeoutId.current);
    }, [timer, countTimer]);

    return <div id={props['id']} align="center">{text} {timer}</div>;
}

export default Timer