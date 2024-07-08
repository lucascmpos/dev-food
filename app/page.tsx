// Next
import Link from "next/link";
// Prisma
import { db } from "./_lib/prisma";
// Components
import Search from "./_components/search";
import PromoBanner from "./_components/promo-banner";
import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";

import RestaurantList from "./_components/restaurant-list";
import Header from "./_components/header";

const fetch = async () => {
  const getProducts = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguerCategory = await db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = await db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguerCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguerCategory,
    getPizzasCategory,
  ]);

  return { products, burguerCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguerCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />

      <div className="hidden md:mt-4 md:block md:w-full">
        <div className="relative">
          <PromoBanner
            src={"/promo-banner03.png"}
            alt="está com fome? com apenas alguns cliques...."
          />

          <div className="absolute left-[9%] top-[45%] w-1/2">
            <Search />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="md:hidden">
          <Search />
        </div>

        <CategoryList />

        <Link
          className="md:hidden"
          href={`/categories/${pizzasCategory?.id}/products`}
        >
          <PromoBanner
            src={"/promo-banner01.png"}
            alt="até 30% de desconto em pizzas."
          />
        </Link>

        <ProductList products={products} />

        <div className="hidden md:mb-6 md:grid md:grid-cols-2 md:gap-4">
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
            <PromoBanner
              src={"/promo-banner01.png"}
              alt="até 30% de desconto em pizzas."
            />
          </Link>
          <Link href={`/categories/${burguerCategory?.id}/products`}>
            <PromoBanner
              src={"/promo-banner02.png"}
              alt="a partir de R$ 17,90 em lanches."
            />
          </Link>
        </div>

        <Link
          className="md:hidden"
          href={`/categories/${burguerCategory?.id}/products`}
        >
          <PromoBanner
            src={"/banner_promo_02.png"}
            alt="a partir de R$ 17,90 em lanches."
          />
        </Link>

        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
