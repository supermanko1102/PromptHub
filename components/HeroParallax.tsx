"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { FlipWords } from "./ui/flipWord";
import { TypewriterEffectSmooth } from "./ui/typewriterEffect";
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link?: string;
    category: string;
    description: string;
    _id: number;
    _createdAt: Date;
    View: number;
    author: { name: string; image: string; bio: string };
    image: string;
    isFeatured: boolean;
  }[];
}) => {
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 6);
  const thirdRow = products.slice(6, 9);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // const translateX = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, 1000]),
  //   springConfig
  // );
  // const translateXReverse = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, -1000]),
  //   springConfig
  // );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className=" text-center mb-2 text-2xl md:text-4xl font-bold text-blue-500">
          探索精選提示詞
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </motion.div>
        <motion.div className=" text-center mb-10 text-2xl md:text-4xl font-bold text-blue-500">
          熱門分類
        </motion.div>
        <motion.div className="flex flex-row  mb-10 space-x-20 ">
          {secondRow.map((product) => (
            // <StackCard
            //   items={[product]}
            //   translate={translateXReverse}
            //   key={product.title}
            // />
            <ProductCard product={product} key={product.title} />
          ))}
        </motion.div>
        <motion.div className=" text-center mb-2 text-2xl md:text-4xl font-bold text-blue-500">
          最新分享
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const TypeWord = [{ text: "AI 對話的橋樑" }];
  const words = ["創新", "專業", "高效", "智能", "精準"];
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-blue-500">
        {/* AI 對話的橋樑 <br /> */}
        <TypewriterEffectSmooth words={TypeWord} className="text-blue-500" />
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-blue-300">
        發掘
        <FlipWords words={words} className="text-blue-500 text-2xl" />的 AI
        提示詞
      </p>
    </div>
  );
};
