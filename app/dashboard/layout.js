"use client";

import { SiteContext } from "@/app/context";
import { useContext, useState } from "react";
import s from "./page.module.scss";
import { AiFillLock, AiOutlineLock, AiTwotoneLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { LuLock } from "react-icons/lu";
import { PiLockKeyFill } from "react-icons/pi";
import { Sidebar } from "./components";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Space_Grotesk } from "next/font/google";
import { Avatar } from "../(home)/components";
import { Footer } from "../components";
import { motion, AnimatePresence } from "framer-motion";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const { user } = useContext(SiteContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <button
              className={`${s.menuBtn} btn clear small white`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <GiHamburgerMenu />
            </button>
            <Link href="/">
              <div className={s.logo}>
                <img src="/assets/logo_big_eyes_white.png" />
                <h2 className={space_grotesk.className}>Infin AI</h2>
              </div>
            </Link>
          </div>
          <div className={s.right}>
            <Avatar />
          </div>
        </div>
      </header>
      <div
        className={`${s.container} ${
          sidebarOpen ? s.sidebarOpen : ""
        } body-min-1fr-min`}
      >
        <Sidebar closeSidebar={setSidebarOpen} />
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={s.backdrop}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        <div className={s.content}>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
