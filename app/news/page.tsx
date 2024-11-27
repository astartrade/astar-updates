import BlogCard from "@/components/ui/BlogCard";
import { bebas } from "@/config/fonts";

// Removed the import of BlogCard due to the error

export default function NewsPage() {
  return (
    <>
      {/* Card Blog */}
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Title */}
        <div className="mx-auto mb-10 max-w-7xl text-left lg:mb-14">
          <h2
            className={`${bebas.className} text-2xl dark:text-white md:text-4xl md:leading-tight`}
          >
            News & Articles
          </h2>
          <p className="mt-1 max-w-4xl text-gray-600 dark:text-neutral-400">
            Welcome to our News and Articles section, where we dive into
            Africa's evolving markets, exploring the power of trade, technology,
            and sustainability.
          </p>
          <br />
          <p className="mt-1 max-w-4xl text-gray-600 dark:text-neutral-400">
            {" "}
            From the game-changing African Continental Free Trade Area (AfCFTA)
            to the leading commodities of 2024, discover fresh insights that
            drive regional growth, support sustainable investment, and empower
            Africa's economic transformation.
          </p>
        </div>
        {/* End Title */}

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card */}
          <BlogCard
            author="By Astar Team"
            description="We will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commodities"
            imageAlt="Intra-African Trade"
            imageSrc="/images/farming.jpg"
            title="The Rise of Intra-African Trade: What It Means for Regional Growth"
          />
          <BlogCard
            author="By Astar Team"
            description="We will focus on the key commodities (like oil, gas, minerals, agriculture) and how 
                they impact regional markets."
            imageAlt="Commodities in Africa"
            imageSrc="/images/construction.jpg"
            title="Top Commodities Driving Africa’s Economy in 2024"
          />
          <BlogCard
            author="By Astar Team"
            description="Under this we will explain the importance of sustainability in investment, 
                  highlighting ASTAR’s commitment to promoting eco-friendly projects."
            imageAlt="Sustainable Investment"
            imageSrc="/images/mission2.jpg"
            title="Why Sustainable Investment Matters for Africa’s Future"
          />
          <BlogCard
            author="By Astar Team"
            description="Here, we will Discuss how technology is transforming commodities trading in Africa, 
            from blockchain for transparency to AI for market analysis."
            imageAlt="Sustainable Investment"
            imageSrc="/images/trading.jpg"
            title="The Role of Technology in Africa’s Commodity Markets"
          />
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Card Blog */}
    </>
  );
}
