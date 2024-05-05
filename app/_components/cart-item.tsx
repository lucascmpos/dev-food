import Image from "next/image";
import { CartContext, CartProduct } from "./../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <div className="relative h-20 w-20 ">
          <Image
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            sizes="100%"
            fill
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex items-center  text-center">
              <Button
                onClick={handleDecreaseQuantityClick}
                size="icon"
                variant="ghost"
                className="h-7 w-7 border border-solid border-muted-foreground"
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <span className="block w-7 text-xs">{cartProduct.quantity}</span>
              <Button
                onClick={handleIncreaseQuantityClick}
                size="icon"
                className="h-7 w-7"
              >
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleRemoveClick}
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
