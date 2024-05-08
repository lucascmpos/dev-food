import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex h-12 flex-row items-center justify-center gap-3 rounded-full bg-[#FFFF] px-6 py-3 shadow-md transition-all hover:bg-gray-100"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
        sizes="100%"
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
