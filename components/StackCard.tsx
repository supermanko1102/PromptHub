"use client";
import { useEffect, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

interface StackCardProps {
  items: Card[];
  translate?: MotionValue<number>;
  offset?: number;
  scaleFactor?: number;
}

export function StackCard({
  items,
  translate,
  offset = 10,
  scaleFactor = 0.06,
}: StackCardProps) {
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product relative h-96 w-[30rem] flex-shrink-0"
    >
      <div className="relative h-60 w-60 md:h-60 md:w-96">
        {cards.map((card, index) => (
          <motion.div
            key={card._id}
            className="absolute h-60 w-60 md:h-72 md:w-96 rounded-3xl shadow-xl shadow-black/[0.1] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
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
        ))}
      </div>
    </motion.div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};
