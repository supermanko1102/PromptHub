import { HeroParallax } from "@/components/HeroParallax";
import { SanityLive } from "@/sanity/lib/live";
import { startupQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const param = { search: query || null };
  const { data: posts } = await sanityFetch({
    query: startupQuery,
    params: param,
  });
  return (
    <div className="text-3xl font-bold max-w-full">
      <>
        <section className="max-h-full max-w-full">
          <HeroParallax products={posts} />
        </section>

        <SanityLive />
      </>
    </div>
  );
}
