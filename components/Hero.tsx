import React from "react";
import { HeroParallax } from "@/components/HeroParallax";
import { startupQuery } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export async function Hero() {
  // const posts = await client.fetch(startupQuery);
  const { data: posts } = await sanityFetch({ query: startupQuery });
  // console.log(JSON.stringify(posts, null, 2));
  return (
    <>
      <section className="max-h-full max-w-full">
        <HeroParallax products={posts} />
      </section>

      <SanityLive />
    </>
  );
}
// export const products = [
//   {
//     title: "ChatGPT Prompt",
//     link: "/prompts/chatgpt",
//     category: "AI 對話",
//     description: "優化你的 ChatGPT 提示詞",
//     _id: 1,
//     _createdAt: new Date(),
//     View: 144,
//     author: {
//       name: "Aceternity",
//       image:
//         "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
//       bio: "Aceternity is a startup that specializes in creating innovative solutions for the modern business world.",
//     },
//     image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
//   },
//   {
//     title: "ChatGPT Prompt",
//     link: "/prompts/chatgpt",
//     category: "AI 對話",
//     description: "優化你的 ChatGPT 提示詞",
//     _id: 1,
//     _createdAt: new Date(),
//     View: 144,
//     author: {
//       name: "Aceternity",
//       image:
//         "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
//       bio: "Aceternity is a startup that specializes in creating innovative solutions for the modern business world.",
//     },
//     image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
//   },
//   {
//     title: "ChatGPT Prompt",
//     link: "/prompts/chatgpt",
//     category: "AI 對話",
//     description: "優化你的 ChatGPT 提示詞",
//     _id: 1,
//     _createdAt: new Date(),
//     View: 144,
//     author: {
//       name: "Aceternity",
//       image:
//         "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
//       bio: "Aceternity is a startup that specializes in creating innovative solutions for the modern business world.",
//     },
//     image: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
//   },
// ];
