"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
let interval: NodeJS.Timeout;

type Card = {
  _id: number;
  _createdAt: Date;
  View: number;
  author: { _id: number };
  description: string;
  image: string;
  category: string;
  title: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card._id}
            className="absolute h-60 w-60 md:h-72 md:w-96 rounded-3xl shadow-xl shadow-black/[0.1] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/25 to-black/50 rounded-2xl">
                <div className="absolute top-4 left-4 right-4 text-white flex justify-between text-xs opacity-80">
                  <span>{card._createdAt.toLocaleDateString()}</span>
                  <span>{card.View} 次觀看</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="flex items-center mt-2 text-xs opacity-80">
                    <span>{card.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
