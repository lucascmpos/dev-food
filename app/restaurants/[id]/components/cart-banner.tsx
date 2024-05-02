"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantsHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantsHasProductsOnCart) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(Number(totalPrice))}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>
        <Sheet>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="md:[70vw] lg:[50vw] w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
