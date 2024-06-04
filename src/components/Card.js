import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";

const Card = ({ card, onClick, isFlipped, isMatched }) => {

    const cardRef = useRef(null);
    const cardContentRef = useRef(null);

    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onClick(card);
        }
    };


    return (
        <div ref={cardRef} className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={handleClick}>
            <div ref={cardContentRef} className={"card__content"}>
                {isFlipped || isMatched ? card.content : '?'}
            </div>
        </div>
    );
};

export default Card;
