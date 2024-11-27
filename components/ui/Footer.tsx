import React from "react";

import Content from "./Content";

import { bebas } from "@/config/fonts";

export default function Footer() {
  return (
    <div
      className={`${bebas.className} relative h-auto md:h-[50dvh] md:min-h-screen`}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="bottom-0 h-auto w-full md:fixed md:h-[50dvh] md:min-h-screen">
        <Content />
      </div>
    </div>
  );
}
