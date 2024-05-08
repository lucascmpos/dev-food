import React from "react";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <div className="flex justify-between bg-accent px-8 py-4 text-[0.625rem] opacity-75">
      <p>
        © 2024 Copyright <span className="font-semibold">Dev Food</span>{" "}
      </p>

      <a
        className="flex flex-row items-center justify-center gap-2 hover:text-red-500"
        href="https://github.com/lucascmpos/dev-food"
        target="_blank"
      >
        <p>Feito por Lucas Campos</p>
        <IoLogoGithub size={18} />
      </a>
    </div>
  );
};

export default Footer;
