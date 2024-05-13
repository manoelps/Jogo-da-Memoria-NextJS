import { shuffleArray } from '@/helpers/shuffleArray';
import { cards } from '@/mocks/cards';
import { useEffect, useState } from 'react';

const useMemoryGame = () => {
  const [begin, setBegin] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [listOfCards, setListOfCards] = useState<CardProps[]>([]);
  const [quantityChoice, setQuantityChoice] = useState<number>(1);
  const [compare, setCompare] = useState<any[]>([]);
  const [waiting, setWaiting] = useState<boolean>(false);

  const viewCard = (idCard: number) => {
    const updateList = listOfCards.map((itemCard: CardProps) => {
      if (itemCard.id === idCard) {
        return { ...itemCard, visibility: true };
      }
      return itemCard;
    });
    setListOfCards(updateList);
  };

  const resetViewCard = (compare: any[]) => {
    const updateList = listOfCards.map((itemCard: CardProps) => {
      if (itemCard.pair === compare[0] || itemCard.pair === compare[1]) {
        return { ...itemCard, visibility: false };
      }
      return itemCard;
    });
    setListOfCards(updateList);
  };

  const playGame = () => {
    setBegin(true);
    const updateList = listOfCards.map((itemCard: CardProps) => {
      return { ...itemCard, visibility: false };
    });
    setListOfCards(updateList);
    setQuantityChoice(1);
    setCompare([]);
    setMoves(0);
  };

  const gameReset = () => {
    setBegin(false);
    const updateList = listOfCards.map((itemCard: CardProps) => {
      return { ...itemCard, visibility: true };
    });
    setListOfCards(updateList);
    setQuantityChoice(1);
    setCompare([]);
    setMoves(0);
    setListOfCards(shuffleArray(cards));
  };

  const handleCheckPair = (selectedCard: CardProps, visibility: boolean) => {
    if (!visibility && !waiting) {
      setCompare([...compare, selectedCard.pair]);
      setQuantityChoice(quantityChoice + 1);

      viewCard(selectedCard.id);

      if (quantityChoice >= 2) {
        setWaiting(true); // diz para esperar a liberacao da proxima jogada
        setQuantityChoice(1); //reseta contador de escolhas
        setMoves(moves + 1);
      }
    }
  };

  useEffect(() => {
    if (compare.length > 1) {
      if (compare[0] === compare[1]) {
        setWaiting(false); // diz que nao precisa mais esperar
        setCompare([]);
      } else {
        setTimeout(() => {
          resetViewCard(compare);
          setCompare([]);
          setWaiting(false); // diz que nao precisa mais esperar
        }, 500);
      }
    }
  }, [quantityChoice]);

  useEffect(() => {
    gameReset();
  }, []);

  return {
    moves,
    begin,
    listOfCards,
    playGame,
    gameReset,
    handleCheckPair,
    waiting
  };
};

export default useMemoryGame;
