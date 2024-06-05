import React, {forwardRef, useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {colors} from "../settings";

const Card = ({card, onClick, isFlipped, isMatched}) => {

    const cardRef = useRef(null)

    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onClick(card);
        }
    };

    useEffect(() => {
        isFlipped ? changeColor(colors.flipped) :
            isMatched ? changeColor(colors.matched) :
                changeColor(colors.classic)
    }, [isFlipped, isMatched]);

    function changeColor(color) {
        gsap.to(cardRef.current, {
            duration: 0.5,
            ease: "sine",
            backgroundColor: color
        })
    }

    return (
        <div ref={cardRef} className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={handleClick}>
            <div className={"card__content"}>
                {isFlipped || isMatched ? card.content : '?'}
            </div>
        </div>
    );
};

export default Card;
