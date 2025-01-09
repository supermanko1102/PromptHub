"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "framer-motion";

export function StackCard({ translate }: { translate: MotionValue<number> }) {
  //   return (
  //     <div className="h-[40rem] flex items-center justify-center w-full">
  //       <CardStack items={CARDS} />
  //     </div>
  //   );
  // }
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={0}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <CardStack items={CARDS} />
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

const CARDS = [
  {
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    _id: 1,
    description: "javascript的Promptjavascript的Promptjavascript的Prompt",
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "Cursor",
    title: "javascript的Prompt",
  },
  {
    _createdAt: new Date(),
    View: 44,
    author: { _id: 2 },
    _id: 2,
    description:
      "typescript的Prompttypescript的Prompttypescript的Prompttypescript的Prompt",
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "Cursor",
    title: "typescript的Prompt",
  },
];
