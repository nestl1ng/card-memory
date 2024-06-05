import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Timer = () => {
    const [time, setTime] = useState(0);
    const { matchedCards, cards } = useSelector(state => state);

    useEffect(() => {
        let timer;
        if (matchedCards.length < cards.length) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [matchedCards, cards]);

    useEffect(() => {
        setTime(0);
    }, []);

    return <div className="timer">Time: {time}s</div>;
};

export default Timer;
