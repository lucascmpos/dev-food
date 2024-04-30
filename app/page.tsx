import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          className="h-auto w-full"
          src="/promo-banner01.png"
          alt="Até 30% de desconto em pizzas"
          height={0}
          width={0}
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  );
};

export default Home;
