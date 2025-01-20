import { ColorfulText } from "@/components/ui/colorfulText";
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
  const { _createdAt, title } = post;

  const formattedDate = new Date(_createdAt).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="flex flex-col items-center justify-center !min-h-[230px] ">
        <p>{formattedDate}</p>

        <h1 className="text-2xl font-bold">
          <ColorfulText text={title} />
        </h1>
      </section>
    </>
  );
};

export default page;
