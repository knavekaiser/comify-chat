"use client";

import { usePathname } from "next/navigation";
import s from "./page.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import paths from "@/utils/paths";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteContext } from "@/app/context";

export const Sidebar = ({ closeSidebar }) => {
  const { user } = useContext(SiteContext);
  const sidebarItems = useRef([
    { label: user?.email || "Account", path: paths.account },
    { label: "Topic", path: paths.topics },
    { label: "Chats", path: paths.chats },
    { label: "Chatbot", path: paths.chatbot },
    { label: "Analytics", path: paths.analytics },
    { label: "Development", path: paths.development },
    // {label: "Payments", path: ""},
  ]);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === paths.dashboard) {
      router.replace(paths.topics);
    }
  }, []);
  return (
    <div className={s.sidebar}>
      <ul className={s.nav}>
        {sidebarItems.current.map((item) => (
          <Link
            href={item.path}
            key={item.label}
            onClick={() => {
              closeSidebar();
            }}
          >
            <li
              className={`${item.path === pathname ? s.active : ""}`}
              title={item.label}
            >
              <span className="ellepsis">{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export const GettingStarted = () => {
  const [step, setStep] = useState(1);
  return (
    <div className={s.gettingStarted}>
      <div className={s.head}>
        <h3>Getting Started</h3>
      </div>
      {step === 1 && <div className={s.content}>Content</div>}
    </div>
  );
};
