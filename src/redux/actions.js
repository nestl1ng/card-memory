import {MATCH_CARDS, SET_CARDS, FLIP_CARD, RESET_FLIPPED_CARDS} from "../settings";

export const setCards = cards => ({
    type: SET_CARDS,
    payload: cards,
});

export const flipCard = card => ({
    type: FLIP_CARD,
    payload: card,
});

export const resetFlippedCards = () => ({
    type: RESET_FLIPPED_CARDS,
});

export const matchCards = cards => ({
    type: MATCH_CARDS,
    payload: cards,
});
