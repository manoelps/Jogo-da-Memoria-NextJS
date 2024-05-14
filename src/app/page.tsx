'use client';

import useMemoryGame from '@/hooks/useGame';
import classNames from 'classnames';
import Image from 'next/image';

const Home = () => {
  const { moves, begin, listOfCards, playGame, gameReset, handleCheckPair } =
    useMemoryGame();

  return (
    <>
      <main className="flex flex-col items-center justify-center bg-neutral-200 h-screen">
        <div className="text-3xl font-extrabold text-[#F5B62B] mb-4">
          JOGADAS: <span className="text-gray-400">{moves}</span>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
          {listOfCards.map(card => (
            <div
              key={card.id}
              className={classNames(
                `flex items-center justify-center w-20 h-20
                bg-purple-500 rounded cursor-pointer
                shadow-md shadow-black/40
                [transform-style:preserve-3d] duration-1000 delay-[var(--delay)]
                `,
                {
                  'cursor-not-allowed [transform-style:preserve-3d] [transform:rotateY(180deg)] duration-1000 delay-[var(--delay)]':
                    !card.visibility
                }
              )}
              onClick={() => {
                handleCheckPair(card, card.visibility);
              }}
            >
              <div className="flex items-center justify-center w-20 h-20 duration-1000 delay-[var(--delay)]">
                <Image
                  src={`/${card.image}`}
                  alt={card.pair}
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div className="flex items-center justify-center w-20 h-20  rounded absolute inset-0 bg-blue-500 [transform:rotateY(180deg)] [backface-visibility:hidden] duration-1000 delay-[var(--delay)]">
                <span>
                  <Image
                    src="/fun.png"
                    alt={card.pair}
                    width={40}
                    height={40}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center mt-11 gap-3">
          {!begin ? (
            <button
              onClick={playGame}
              disabled={begin}
              className={classNames(
                'px-6 py-2 bg-green-400 text-white font-semibold rounded-md shadow',
                { 'bg-gray-400 cursor-not-allowed': begin }
              )}
            >
              INICIAR
            </button>
          ) : (
            <button
              onClick={gameReset}
              disabled={!begin}
              className={classNames(
                'px-4 py-2 bg-red-400 text-white font-semibold rounded-md shadow',
                { 'bg-gray-400 cursor-not-allowed': !begin }
              )}
            >
              RECOMEÇAR
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
