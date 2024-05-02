import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className=" grid grid-cols-2 items-center gap-3 md:grid-cols-3 lg:flex lg:flex-row lg:items-center lg:justify-center">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
