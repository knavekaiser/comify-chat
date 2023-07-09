"use client";

import { SiteContext } from "@/app/context";
import { useContext } from "react";
import s from "./page.module.scss";
import { AiFillLock, AiOutlineLock, AiTwotoneLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { LuLock } from "react-icons/lu";
import { PiLockKeyFill } from "react-icons/pi";
import { Sidebar } from "./components";
import Link from "next/link";

import { Space_Grotesk } from "next/font/google";
import { UserOptions } from "../(home)/components";
import { Footer } from "../components";
const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const { user } = useContext(SiteContext);

  if (!user) {
    return (
      <>
        <span />
        <main className={`${s.fallback} body-min-1fr-min`}>
          <div className={s.locks}>
            <AiFillLock />
            <AiOutlineLock />
            <AiTwotoneLock />
            <FiLock />
            <FaLock />
            <IoMdLock />
            <LuLock />
            <PiLockKeyFill />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header className={s.header}>
        <div className={s.innerWrapper}>
          <div className={s.left}>
            <Link href="/">
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
      <div className={`${s.container} body-min-1fr-min`}>
        <Sidebar />
        <div className={s.content}>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
