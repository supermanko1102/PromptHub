"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

interface ProductCardProps {
  product: {
    title: string;
    link?: string;
    image: string;
    category: string;
    description: string;
    views?: number;
    author: { name: string; image: string; bio: string };
    _createdAt: Date;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { title, image, category, description, views, author, _createdAt } =
    product;
  return (
    <motion.div
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
          src={image}
          height={600}
          width={600}
          className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-105"
          alt={title}
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>{views}</span>
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm flex items-center space-x-1">
          <span>{new Date(_createdAt).toLocaleDateString()}</span>
        </div>
      </Link>

      {/* 內容區域 */}
      <div className="p-6 h-1/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
              {category}
            </span>
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="group relative">
                <span className="text-sm text-gray-600">{author.name}</span>
              </div>
            </div>
          </div>
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
