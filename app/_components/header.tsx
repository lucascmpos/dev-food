"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollText,
} from "lucide-react";
import Logo from "/logo.png";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();
  const handleSignOutClick = () => signOut();
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link className="flex flex-row gap-2" href="/">
        <h1 className="text-2xl font-extrabold italic text-red-500">DEV</h1>
        <Image
          src={Logo}
          alt="Dev Foods"
          height={10}
          width={60}
          quality={100}
        />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="md:[70vw] lg:[50vw] w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user.image as string | undefined} />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Olá! Faça seu login</h2>
              <Button onClick={handleSignInClick} size="icon">
                <LogInIcon size={20} />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollText size={16} />
                    <span className="block">Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
            {data?.user && (
              <Button
                onClick={handleSignOutClick}
                variant="ghost"
                className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
