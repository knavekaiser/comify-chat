"use client";
import { useContext, useEffect } from "react";
import { SiteContext } from "./context";
import { useFetch } from "@/utils/hooks";
import endpoints from "@/utils/endpoints";
import { usePathname, useRouter } from "next/navigation";
import paths from "@/utils/paths";
import s from "./components.module.scss";

import { RouterEvents } from "../components/pageLoader";
import { Space_Grotesk } from "next/font/google";
const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

function resizeWindow() {
  let vh = window.innerHeight * 0.01;
  document.body.style.setProperty("--vh", `${vh}px`);
}

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
        router.replace(paths.login);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => resizeWindow());
    resizeWindow();
  }, []);

  return (
    <>
      <RouterEvents />
    </>
  );
}

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.innerWrapper}>
        <div className={s.section_one}>
          <div className={s.logo}>
            <img src="/assets/logo_big_eyes.png" />
            <h2 className={space_grotesk.className}>Comify Chat</h2>
          </div>
        </div>

        <div className={s.section_two}>
          <div className={s.head}>
            <h6>Company</h6>
          </div>
          <div className={s.body}>
            <ul className={s.menu}>
              <li>
                <a href="#">About Us</a>
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
        </div>

        <div className={s.section_three}>
          <div className={s.head}>
            <h6>Use Casees</h6>
          </div>
          <div className={s.body}>
            <ul className={s.menu}>
              <li>
                <a href="#">About Us</a>
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
        </div>

        <div className={s.section_four}>
          <div className={s.head}>
            <h6>Contact Info</h6>
          </div>
          <div className={s.body}>
            <p>
              Maxuel Street, Frankfurt
              <br />
              2589 Germany.
            </p>
            <a href="mailto:chat@comify.in">
              <h6 className={s.email}>chat@comify.in</h6>
            </a>
            <a href="#" className={s.number}>
              +2858 62359 32159
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
