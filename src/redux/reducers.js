import { SET_CARDS, FLIP_CARD, RESET_FLIPPED_CARDS, MATCH_CARDS } from './../settings';

const initialState = {
    cards: [],
    flippedCards: [],
    matchedCards: [],
};

const reducer = (state = initialState, {payload,type}) => {
    switch (type) {
        case SET_CARDS:
            return {
                ...state,
                cards: payload,
            };
        case FLIP_CARD:
            return {
                ...state,
                flippedCards: [...state.flippedCards, payload],
            };
        case RESET_FLIPPED_CARDS:
            return {
                ...state,
                flippedCards: [],
            };
        case MATCH_CARDS:
            return {
                ...state,
                matchedCards: [...state.matchedCards, ...state.flippedCards],
                flippedCards: [],
            };
        default:
            return state;
    }
};

export default reducer;
