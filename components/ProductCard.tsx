"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionValue } from "framer-motion";

interface ProductCardProps {
  product: {
    title: string;
    link?: string;
    thumbnail: string;
    category: string;
    description: string;
  };
  translate?: MotionValue<number>;
}

export const ProductCard = ({ product, translate }: ProductCardProps) => {
  const { title, thumbnail, category, description } = product;
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="group h-96 w-[30rem] relative flex-shrink-0 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20"
    >
      {/* 圖片區域 */}
      <Link href={"#"} className="block group-hover:shadow-2xl relative h-2/3">
        <Image
          src={thumbnail}
          height={600}
          width={600}
          className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-105"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </Link>

      {/* 內容區域 */}
      <div className="p-6 h-1/3 flex flex-col justify-between">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
            {category}
          </span>
          <h3 className="text-xl font-bold mt-3 text-gray-800 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
