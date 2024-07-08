"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/app/_context/cart";
import { Prisma } from "@prisma/client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ProductList from "@/app/_components/product-list";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });

    setIsCartOpen(true);
  };

  const handleAddToCart = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  const handleIncreaceProductQuantity = () => {
    setQuantity((state) => state + 1);
  };

  const handleDecreaseProductQuantity = () => {
    setQuantity((state) => {
      if (state === 1) {
        return 1;
      }
      return state - 1;
    });
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl  p-5 md:z-0 md:mt-0 md:block md:rounded-lg md:p-6">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="text-xl font-bold">{product.name}</h1>

        <div className="mt-4 flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>

            {product.discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground line-through">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant={"ghost"}
              className="border border-muted-foreground"
              onClick={handleDecreaseProductQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaceProductQuantity}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <DeliveryInfo restaurant={product.restaurant} />

        <div className="flex flex-col gap-2">
          <h3 className="mt-6 font-bold">Descrição</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 md:hidden">
          <Button className="w-full font-semibold" onClick={handleAddToCart}>
            Adicionar à sacola
          </Button>
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <h3 className="mt-6 font-bold">Bebidas</h3>
          <p className="text-sm text-muted-foreground">
            Adicione uma bebida ao seu pedido
          </p>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 hidden md:block">
          <Button className="w-full font-semibold" onClick={handleAddToCart}>
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[80vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente adicionar o produto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Caso escolha adicionar produto de restaurante diferente,
              acarretará na criação de uma nova sacola referente ao restaurante
              escolhido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
