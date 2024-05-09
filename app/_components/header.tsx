"use client";

import { Button } from "./ui/button";
import {
  CupSoda,
  Dessert,
  Fish,
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Pizza,
  Sandwich,
  ScrollTextIcon,
  Utensils,
} from "lucide-react";
import Logo from "../../public/logo.svg";

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
import Image from "next/image";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="">
        <Link
          className="flex flex-row items-center justify-center gap-2"
          href="/"
        >
          <h1 className="text-4xl font-extrabold italic text-red-600">dev</h1>
          <Image
            src={Logo}
            alt="Tempo de entrega"
            className="mt-2 w-20 fill-red-600"
            sizes="100%"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
            asChild
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex  justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
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
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal    hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal   hover:bg-red-500 hover:text-white"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal  hover:bg-red-500 hover:text-white"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/categories/bfa46e64-8d0a-4be0-89b5-6051517b63ee/products">
                <Utensils size={16} />
                <span className="block">Brasileira</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/categories/0ccf1445-4ed9-46b3-bbf9-4d4853527642/products">
                <Sandwich size={16} />
                <span className="block">Lanches</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/categories/15d3e98b-da9d-41af-9c84-98d0604645b4/products">
                <Pizza size={16} />
                <span className="block">Pizza</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/categories/16fb6edf-8014-45e7-8886-ee8364e0ca93/products">
                <Fish size={16} />
                <span className="block">Japonesa</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/categories/9073df6c-3e2a-40ca-9da7-63127fdbe1c9/products">
                <Dessert size={16} />
                <span className="block">Sobremesas</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              asChild
            >
              <Link href="/categories/b24b3785-3a7c-4d0a-a8b0-1f2f1fac1ac5/products">
                <CupSoda size={16} />
                <span className="block">Sucos</span>
              </Link>
            </Button>
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-red-500 hover:text-white"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
