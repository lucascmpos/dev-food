import Link from "next/link";
import { db } from "./_lib/prisma";
import Search from "./_components/search";
import PromoBanner from "./_components/promo-banner";
import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";

import RestaurantList from "./_components/restaurant-list";
import Header from "./_components/header";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";

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
      <Header isSearchBar={false} />

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

        <div className="mt-3">
          <CategoryList />
        </div>

        <Link
          className="md:hidden"
          href={`/categories/${pizzasCategory?.id}/products`}
        >
          <PromoBanner
            src={"/promo-banner01.png"}
            alt="até 30% de desconto em pizzas."
          />
        </Link>

        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Pedidos Recomendados</h2>

            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/products/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

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

        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Restaurantes Recomendados</h2>

            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/restaurants/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default Home;
