import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link className="flex flex-row gap-2" href="/">
        <h1 className="text-2xl font-extrabold text-red-500">DEV</h1>
        <Image
          src="/logo.png"
          alt="Dev Foods"
          height={10}
          width={60}
          quality={100}
        />
      </Link>
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
