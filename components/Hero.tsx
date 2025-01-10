import React from "react";
import { HeroParallax } from "@/components/HeroParallax";
import { startupQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export async function Hero() {
  const posts = await client.fetch(startupQuery);
  console.log(JSON.stringify(posts, null, 2));
  return (
    <section className="max-h-full max-w-full">
      <HeroParallax products={posts} />
    </section>
  );
}
export const products = [
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 1,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 2,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 3,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 4,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 5,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 6,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 7,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "ChatGPT Prompt",
    link: "/prompts/chatgpt",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    category: "AI 對話",
    description: "優化你的 ChatGPT 提示詞",
    _id: 8,
    _createdAt: new Date(),
    View: 144,
    author: { _id: 1 },
    image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
];
