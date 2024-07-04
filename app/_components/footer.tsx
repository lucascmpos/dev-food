import React from "react";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-accent py-4 text-[0.625rem] opacity-75 lg:px-8  lg:text-sm">
      <div className="container mx-auto flex w-full items-center justify-between">
        <p>
          © 2024 Copyright <span className="font-semibold">dev food</span>{" "}
        </p>

        <a
          className="flex flex-row items-center justify-center gap-2 hover:underline"
          href="https://github.com/lucascmpos/dev-food"
          target="_blank"
        >
          <p>Feito por Lucas Campos</p>
          <IoLogoGithub size={18} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
