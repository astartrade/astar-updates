import NewsContent from "@/components/NewsContent";
import { bebas } from "@/config/fonts";
import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  // Fetch initial data on the server
  const initialArticles = await prisma.article.findMany({
    where: {
      status: "published", // Adjust based on your field name and value
    },
    include: {
      author: true,
    },
  });
  

  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-7xl text-left lg:mb-14 p-4 md:p-8 bg-white text-foreground md:rounded-2xl">
        <h2
          className={`${bebas.className} text-2xl dark:text-white md:text-4xl md:leading-tight`}
        >
          News & Articles
        </h2>
        <p className="mt-1 max-w-4xl text-gray-600 dark:text-neutral-400">
          Welcome to our News and Articles section, where we dive into Africa's
          evolving markets, exploring the power of trade, technology, and
          sustainability.
        </p>
        <br />
        <p className="mt-1 max-w-4xl text-gray-600 dark:text-neutral-400">
          From the game-changing African Continental Free Trade Area (AfCFTA) to
          the leading commodities of 2024, discover fresh insights that drive
          regional growth, support sustainable investment, and empower Africa's
          economic transformation.
        </p>
      </div>
      {/* End Title */}

      <NewsContent initialArticles={initialArticles} />
    </div>
  );
}
