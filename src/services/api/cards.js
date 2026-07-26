import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const cardsApi = {
    getCards: async () => {
        await delay(LATENCY - 200);
        return [...db.cards];
    },

    addCard: async (cardData) => {
        await delay(LATENCY);
        const newCard = {
            id: `card-${Date.now()}`,
            ...cardData,
            isDefault: db.cards.length === 0 ? true : cardData.isDefault
        };
        if (newCard.isDefault) {
            db.cards = db.cards.map(c => ({ ...c, isDefault: false }));
        }
        db.cards.push(newCard);
        return [...db.cards];
    },

    deleteCard: async (cardId) => {
        await delay(LATENCY - 100);
        db.cards = db.cards.filter(c => c.id !== cardId);
        if (db.cards.length > 0 && !db.cards.some(c => c.isDefault)) {
            db.cards[0].isDefault = true;
        }
        return [...db.cards];
    },

    setDefaultCard: async (cardId) => {
        await delay(LATENCY - 200);
        db.cards = db.cards.map(c => ({
            ...c,
            isDefault: c.id === cardId
        }));
        return [...db.cards];
    }
};
