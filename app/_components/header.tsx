import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="flex flex-row gap-2 ">
        <h1 className="text-2xl font-extrabold text-red-500">DEV</h1>
        <Image src="/Logo.png" alt="Dev Foods" height={10} width={60} />
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
