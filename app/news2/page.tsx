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
            description={<div className="">We will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commodities</div>}
            imageAlt="Intra-African Trade"
            imageSrc="/images/farming.jpg"
            title="The Rise of Intra-African Trade: What It Means for Regional Growth"
          />
          <BlogCard
            author="By Astar Team"
            description={<div className="line-clamp-5 ">We will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commoditiesWe will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commoditiesWe will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commoditiesWe will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commoditiesWe will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commodities</div>}
            imageAlt="Intra-African Trade"
            imageSrc="/images/farming.jpg"
            title="The Rise of Intra-African Trade: What It Means for Regional Growth"
          />
          <BlogCard
            author="By Astar Team"
            description={<div className="">We will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commodities</div>}
            imageAlt="Intra-African Trade"
            imageSrc="/images/farming.jpg"
            title="The Rise of Intra-African Trade: What It Means for Regional Growth"
          />
          <BlogCard
            author="By Astar Team"
            description={<div className="">We will Discuss the opportunities that the African Continental Free Trade Area 
              (AfCFTA) provides for businesses and investors in commodities</div>}
            imageAlt="Intra-African Trade"
            imageSrc="/images/farming.jpg"
            title="The Rise of Intra-African Trade: What It Means for Regional Growth"
          />


          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Card Blog */}
    </>
  );
}
