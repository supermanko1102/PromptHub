import { ColorfulText } from "@/components/ui/colorfulText";
import { client } from "@/sanity/lib/client";
import { startupByIdQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(startupByIdQuery, { id });
  if (!post) {
    notFound();
  }
  const { _createdAt, title, description, image, author, category } = post;

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
        <p>{description}</p>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 my-8">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image}
              alt={author?.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <p className="text-lg font-bold">{author?.name}</p>
            <p className="text-sm text-gray-500">{author?.username}</p>
          </Link>
          <p>{category}</p>
        </div>
        <h3>詳細內容</h3>
      </section>
    </>
  );
};

export default page;
