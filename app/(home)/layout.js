"use client";

import Link from "next/link";
import s from "./page.module.scss";
import { RightSection } from "./components";
import { Footer } from "../components";
import paths from "@/utils/paths";

export default function RootLayout({ children }) {
  return (
    <>
      <header className={s.header}>
        <div className={s.innerWrapper}>
          <div className={s.left}>
            <Link href={paths.home}>
              <div className={s.logo}>
                <img src="/assets/logo_big_eyes_white.png" />
                <h2>Infin AI</h2>
              </div>
            </Link>
          </div>
          <RightSection />
        </div>
      </header>
      {children}
      <Footer />
    </>
  );
}
