import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="left-2 top-2 flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[3px] text-black text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
    </div>
  );
};

export default RestaurantPage;
