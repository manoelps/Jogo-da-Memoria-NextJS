'use client';

import { animals } from '@/mocks/animals';

const Home = () => {
  return (
    <main className="flex items-center justify-center bg-black/50 h-screen">
      <div className="grid grid-cols-5 gap-3">
        {animals.map(animal => (
          <div
            key={animal.id}
            className="flex items-center justify-center w-20 h-20 bg-black/50 rounded"
          >
            <span> {animal.pair}</span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
