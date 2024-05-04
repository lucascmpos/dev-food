import { Suspense } from "react";
import Restaurants from "./[id]/components/restaurants";

const RestaurantsPage = () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantsPage;
