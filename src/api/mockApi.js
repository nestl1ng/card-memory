export const fetchCards = () => {
    return new Promise((resolve) => {
        const cards = [
            {id: 1, content: 'A'},
            {id: 2, content: 'B'},
            {id: 3, content: 'C'},
            {id: 4, content: 'D'},
            {id: 5, content: 'E'},
            {id: 6, content: 'F'},
            {id: 7, content: 'G'},
            {id: 8, content: 'H'},

        ];
        resolve(cards);
    });
};
