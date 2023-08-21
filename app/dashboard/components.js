"use client";

import { usePathname } from "next/navigation";
import s from "./page.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import paths from "@/utils/paths";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteContext } from "@/app/context";
import TopicForm from "./topics/form";
import { ChatbotConfig } from "./chatbot/page";
import { Codes } from "./development/page";

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

export const GettingStarted = ({ close }) => {
  const [step, setStep] = useState(3);
  const { user } = useContext(SiteContext);
  return (
    <div className={s.gettingStarted}>
      <header>
        <h1>Getting Started</h1>
        {step === 1 && <p className={s.description}>Add your first topic</p>}
        {step === 2 && (
          <p className={s.description}>Update chatbot configuration</p>
        )}
        {step === 3 && (
          <p className={s.description}>Add chatbot to your site</p>
        )}
      </header>

      <div className={s.content}>
        {step === 1 && <TopicForm onSuccess={() => setStep(2)} />}
        {step === 2 && (
          <>
            <ChatbotConfig />
            <div className={s.actions}>
              <button
                className={`btn primary`}
                disabled={!user.chatbot?.domain}
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <Codes />
            <div className={s.actions}>
              <button
                className={`btn primary`}
                disabled={!user.chatbot?.domain}
                onClick={() => close()}
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
