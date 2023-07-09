"use client";

import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import s from "./page.module.scss";
import { UserOptions } from "./components";
import { Footer } from "../components";
import paths from "@/utils/paths";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export const metadata = {
  title: "Comify Chat",
  description:
    "Comify Chat provides AI powered ChatBot that can be depoloyed on any site with minimal code.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <header className={s.header}>
        <div className={s.innerWrapper}>
          <div className={s.left}>
            <Link href={paths.home}>
              <div className={s.logo}>
                <img src="/assets/logo_big_eyes_white.png" />
                <h2 className={space_grotesk.className}>Comify Chat</h2>
              </div>
            </Link>
          </div>
          <div className={s.right}>
            <UserOptions />
          </div>
        </div>
      </header>
      {children}
      <Footer />
    </>
  );
}
