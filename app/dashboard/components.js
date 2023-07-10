"use client";

import { usePathname } from "next/navigation";
import s from "./page.module.scss";
import { useContext, useEffect, useRef } from "react";
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
    // {label: "Settings", path: ""},
    // {label: "Accounts", path: ""},
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
            <li className={item.path === pathname ? s.active : ""}>
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
