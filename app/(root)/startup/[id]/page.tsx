import { client } from "@/sanity/lib/client";
import { startupByIdQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(startupByIdQuery, { id });
  if (!post) {
    notFound();
  }
  return (
    <>
      <h1 className="text-2xl font-bold">{post.title}</h1>
    </>
  );
};

export default page;
