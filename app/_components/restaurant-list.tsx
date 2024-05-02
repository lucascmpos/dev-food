import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <div className="flex flex-row gap-4 overflow-x-scroll px-5 lg:grid lg:grid-cols-5 lg:items-center lg:justify-center lg:gap-10 lg:p-10 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
