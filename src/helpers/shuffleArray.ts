export const shuffleArray = (cards: CardProps[]) => {
  for (let index = cards.length - 1; index > 0; index--) {
    const randomElement = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[randomElement]] = [cards[randomElement], cards[index]];
  }
  return cards;
};
