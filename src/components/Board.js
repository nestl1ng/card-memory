import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {time} from "../settings";
import {fetchCards} from '../api/mockApi';
import Card from './Card';
import {setCards, flipCard, resetFlippedCards, matchCards} from '../redux/actions';
import "./../styles/Game.css"

const Board = () => {
    const dispatch = useDispatch();
    const {cards, flippedCards, matchedCards} = useSelector(state => state);

    useEffect(() => {
        fetchCards().then(data => {
            const shuffledCards = shuffleArray(data);
            dispatch(setCards(shuffledCards));
        });
    }, [dispatch]);

    useEffect(() => {
        checkMatchCards();
    }, [flippedCards, dispatch]);

    function checkMatchCards() {
        if (flippedCards.length === 2) {
            if (flippedCards[0].content === flippedCards[1].content) {
                dispatch(matchCards(flippedCards));
            }
            setTimeout(() => {
                dispatch(resetFlippedCards());
            }, `${time * 1000}`);
        }
    }

    const handleCardClick = (card) => {
        if (flippedCards.length < 2) {
            dispatch(flipCard(card));
        }
    };

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    return (
        <div className="game-board">
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    onClick={handleCardClick}
                    isFlipped={flippedCards.some(flippedCard => flippedCard.id === card.id)}
                    isMatched={matchedCards.some(matchedCard => matchedCard.id === card.id)}
                />
            ))}
        </div>
    );
};

export default Board;
