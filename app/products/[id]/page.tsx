// Next
import { notFound } from "next/navigation";
// Prisma
import { db } from "@/app/_lib/prisma";
// Components
import ProductList from "@/app/_components/product-list";
import { Card } from "@/app/_components/ui/card";
import Header from "@/app/_components/header";
import ProductImage from "./components/product-image";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Header isSearchBar={true} />

      <div className="mt-6 md:container">
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <ProductImage product={JSON.parse(JSON.stringify(product))} />

          <Card className="border-solid border-gray-300 pt-6 ">
            <ProductDetails
              product={JSON.parse(JSON.stringify(product))}
              complementaryProducts={juices}
            />
          </Card>
        </div>

        <div className="mb-5  hidden flex-col gap-2 px-5 sm:hidden md:col-span-2 md:mb-0 md:block">
          <h3 className="mt-6 font-bold">Bebidas</h3>
          <p className="text-sm text-muted-foreground">
            Adicione uma bebida ao seu pedido
          </p>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
