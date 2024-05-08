import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="flex w-full flex-row items-center gap-3 overflow-x-scroll px-2 py-2 md:grid-cols-3 lg:flex lg:flex-row lg:items-center lg:justify-center [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
