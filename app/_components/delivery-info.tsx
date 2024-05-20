import Image from "next/image";
import { Card } from "./ui/card";
import MotorBikeIcon from "../../public/motorbike.svg";
import { formatCurrency } from "../_helpers/price";
import { TimerIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <div>
      <Card className="mt-6 flex justify-around py-3 md:w-1/2 md:justify-center md:gap-10 md:px-20">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <Image src={MotorBikeIcon} alt="Tempo de entrega" sizes="100%" />
          </div>
          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">Tempo</span>
            <TimerIcon size={14} />
          </div>
          <p className="text-xs font-semibold">
            {restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DeliveryInfo;
