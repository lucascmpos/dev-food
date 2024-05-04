import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import Restaurants from "./[id]/components/restaurants";

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
};

export default RestaurantsPage;
