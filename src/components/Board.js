import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {time, gridSizes} from "../settings";
import {fetchCards} from '../api/mockApi';
import Card from './Card';
import {setCards, flipCard, resetFlippedCards, matchCards, clearData} from '../redux/actions';
import "./../styles/Game.css";
import BoardSizeSelector from './BoardSizeSelector';
import Timer from './Timer';

const Board = () => {
    const dispatch = useDispatch();
    const {cards, flippedCards, matchedCards} = useSelector(state => state);
    const [boardSize, setBoardSize] = useState(2);
    const [availableOptions, setAvailableOptions] = useState([]);
    const [timerKey, setTimerKey] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        //test
        fetchCards().then(data => {
            const cards = duplicatedCards(data);
            const options = generateOptions(cards.length, gridSizes);
            setAvailableOptions(options);

            const limitedData = cards.slice(0, boardSize * boardSize);
            const shuffledCards = shuffleArray(limitedData);
            dispatch(setCards(shuffledCards));
        });
    }, [dispatch, boardSize]);

    useEffect(() => {
        checkMatchCards();
    }, [flippedCards]);

    function checkMatchCards() {
        if (flippedCards.length === 2) {
            if (flippedCards[0].content === flippedCards[1].content) {
                dispatch(matchCards(flippedCards));
            }
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                dispatch(resetFlippedCards());
                timeoutRef.current = null;
            }, time * 1000);
        }
    }

    const handleCardClick = (card) => {
        if (flippedCards.length < 2) {
            dispatch(flipCard(card));
        }
    };

    const handleBoardSizeChange = (e) => {
        dispatch(clearData());
        setBoardSize(parseInt(e.target.value));
        setTimerKey(prevKey => prevKey + 1);
    };

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function duplicatedCards(cards) {
        return cards.reduce((acc, card) => {
            const duplicatedCard = {...card, id: card.id + cards.length};
            return [...acc, card, duplicatedCard];
        }, []);
    }

    function generateOptions(cardCount, sizes) {
        return sizes.map(size => ({
            value: size,
            label: `${size}x${size}`,
            disabled: cardCount < Math.pow(size, 2)
        }));
    }

    function getCardById(arr, card) {
        return arr.some(item => item.id === card.id);
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div>
            <Timer key={timerKey}/>
            <BoardSizeSelector onChange={handleBoardSizeChange} options={availableOptions}/>
            <div className="game-board" style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`}}>
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={handleCardClick}
                        isFlipped={getCardById(flippedCards, card)}
                        isMatched={getCardById(matchedCards, card)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
