"use client";

import { SiteContext } from "@/app/context";
import { useContext, useEffect, useRef, useState } from "react";
import s from "./page.module.scss";
import { AiFillLock, AiOutlineLock, AiTwotoneLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { LuLock } from "react-icons/lu";
import { PiLockKeyFill } from "react-icons/pi";
import { GettingStarted, Sidebar } from "./components";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Avatar } from "../(home)/components";
import { Footer } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from "@/utils/hooks";
import endpoints from "@/utils/endpoints";

export default function DashboardLayout({ children }) {
  const firstRender = useRef(true);
  const { user } = useContext(SiteContext);
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { get: getTopics } = useFetch(endpoints.topics);

  useEffect(() => {
    if (firstRender.current && user) {
      getTopics()
        .then(({ data }) => {
          if (data.success) {
            firstRender.current = false;
            if (data.data.length === 0) {
              setShowGettingStarted(true);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, firstRender.current]);

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
                <h2>Infin AI</h2>
              </div>
            </Link>
          </div>
          <div className={s.right}>
            <Avatar />
          </div>
        </div>
      </header>
      {showGettingStarted ? (
        <GettingStarted close={() => setShowGettingStarted(false)} />
      ) : (
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
      )}
    </>
  );
}
