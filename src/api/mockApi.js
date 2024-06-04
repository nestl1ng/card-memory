export const fetchCards = () => {
    return new Promise((resolve) => {
        const cards = [
            {id: 1, content: 'A'},
            {id: 2, content: 'A'},
            {id: 3, content: 'B'},
            {id: 4, content: 'B'},
            {id: 5, content: 'C'},
            {id: 6, content: 'C'},
            {id: 7, content: 'D'},
            {id: 8, content: 'D'},
        ];
        resolve(cards);
    });
};

