"use client";
import { useContext, useEffect } from "react";
import { SiteContext } from "./context";
import { useFetch } from "@/utils/hooks";
import endpoints from "@/utils/endpoints";
import { usePathname, useRouter } from "next/navigation";
import paths from "@/utils/paths";
import s from "./components.module.scss";

import Script from "next/script";

import { RouterEvents } from "../components/pageLoader";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function ClientLayout(params) {
  const { user, setUser } = useContext(SiteContext);
  const { get: getProfile } = useFetch(endpoints.profile);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const authRoutes = [
      paths.login,
      paths.register,
      paths.forgotPassword,
    ].includes(pathname);
    const dashboard = pathname.startsWith(paths.dashboard);
    const access_token = localStorage.getItem("access_token");

    if (user) {
      if (authRoutes) {
        router.replace(paths.dashboard);
      }
    } else if (!user && access_token) {
      getProfile()
        .then(({ data }) => {
          if (data.success) {
            setUser(data.data);
            if (authRoutes) {
              router.replace(paths.dashboard);
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (dashboard) {
        sessionStorage.setItem("destination_after_login", pathname);
        router.replace(paths.login);
      }
    }
  }, []);

  useEffect(() => {
    function adjustVh() {
      let vh = window.innerHeight * 0.01;
      document.body.style.setProperty("--vh", `${vh}px`);
    }
    window.addEventListener("resize", adjustVh);
    adjustVh();
    return () => window.removeEventListener("resize", adjustVh);
  }, []);

  return (
    <>
      <Script
        src={endpoints.infinAIChatSdk}
        strategy="lazyOnload"
        onLoad={() => {
          const { default: mountInfinAI } = InfinAI;
          mountInfinAI({
            baseUrl: endpoints.baseUrl,
            chatbotId: process.env.NEXT_PUBLIC_INFINAI_CHATBOT_ID,
            paths: ["/", "/chatbot"],
          });
        }}
      />
      <RouterEvents />
    </>
  );
}

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.innerWrapper}>
        <div className={s.logoWrapper}>
          <div className={s.logo}>
            <img src="/assets/logo_big_eyes.png" />
            <h2 className={space_grotesk.className}>Infin AI</h2>
          </div>
        </div>

        <div className={s.links}>
          <div className={s.head}>
            <h6>Company</h6>
          </div>
          <div className={s.body}>
            <ul className={s.menu}>
              <li>
                <Link href={paths.aboutUs}>About Us</Link>
              </li>
              <li>
                <Link href={paths.community}>Community</Link>
              </li>
              <li>
                <Link href={paths.careers}>Careers</Link>
              </li>
              <li>
                <Link href={paths.affiliateProgram}>Affiliate Program</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className={s.links}>
          <div className={s.head}>
            <h6>Use Casees</h6>
          </div>
          <div className={s.body}>
            <ul className={s.menu}>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Affiliate Program</a>
              </li>
            </ul>
          </div>
        </div> */}

        <div className={s.contact}>
          <div className={s.head}>
            <h6>Contact Info</h6>
          </div>
          <div className={s.body}>
            {/* <p>
              Maxuel Street, Frankfurt
              <br />
              2589 Germany.
            </p> */}
            <a href="mailto:support@infinai.in">
              <h6 className={s.email}>chat@infinai.in</h6>
            </a>
            {/* <a href="#" className={s.number}>
              +2858 62359 32159
            </a> */}
          </div>
        </div>

        <div className={s.bottom_section}>
          <div className={s.left}>
            <Link href={paths.home}>
              <strong>Infin AI</strong>
            </Link>{" "}
            {new Date().getFullYear()}. All Rights Reserved.
          </div>
          <div className={s.right}>
            <Link href={paths.tnc}>Terms & Conditions</Link>
            <Link href={paths.privacyPolicy}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
