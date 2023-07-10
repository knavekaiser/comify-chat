"use client";
import { useContext, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import s from "./page.module.scss";
import Link from "next/link";
import { Moment } from "@/components/moment";
import { SiteContext } from "@/app/context";
import Menu from "@/components/menu";
import paths from "@/utils/paths";
import { HiUserCircle } from "react-icons/hi";
import { useFetch } from "@/utils/hooks";
import endpoints from "@/utils/endpoints";
import { Prompt } from "@/components/modal";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export const CoreFeatures = () => {
  const [features, setFeatures] = useState([
    {
      title: "Welcome screen",
      description: `Say "Hi" and get the Toking started in a creative way.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "One-click management",
      description: `Say "Hi" and get the Toking started in a creative way.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Custom greetings",
      description: `Say "Hi" and get the Toking started in a creative way.`,
      image: "/assets/feature-prevew.svg",
    },
  ]);
  const [active, setActive] = useState(features[0]);

  return (
    <div className={s.content}>
      <div className={s.imageWrapper}>
        <img src="/assets/avatar_1.png" />
      </div>
      <div className={s.featureDetail}>
        {active && <img src={active.image} />}
      </div>
      <ul className={s.cards}>
        {features.map((item) => (
          <li
            key={item.title}
            className={`${s.card} ${
              active?.title === item.title ? s.active : ""
            }`}
            onClick={() => setActive(item)}
          >
            <h4 className={space_grotesk.className}>{item.title}</h4>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Testimonials = () => {
  const [features, setFeatures] = useState([
    {
      title: "Welcome screen",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "One-click management",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Testimonial 3",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Testimonial 4",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Testimonial 5",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Testimonial 6",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Testimonial 7",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
    {
      title: "Testimonial 8",
      description: `I have used some AI writing tools liked Rytr, Peppertype, and Jasper but I found Writesonic to be the best for writing complete blog posts.`,
      image: "/assets/feature-prevew.svg",
    },
  ]);
  const [active, setActive] = useState(features[0]);

  return (
    <ul className={s.cards}>
      {features.map((item) => (
        <li
          key={item.title}
          className={`${s.card} ${
            active?.title === item.title ? s.active : ""
          }`}
          onClick={() => setActive(item)}
        >
          {/* <h4 className={space_grotesk.className}>{item.title}</h4> */}
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export const Blogs = () => {
  const [blogs, setBlogs] = useState([
    {
      id: "asdfasd",
      author: "Comify Chat",
      title: "Chatbot vs. Live Chat – Which is Better for Customer Service?",
      createdAt: new Date(),
      thumbnail: "/assets/blog-1.jpg",
    },
    {
      id: "asdgfasdgasdg",
      author: "Comify Chat",
      title: "10 Best Sales Chatbots to Boost Your Revenue in 2023",
      createdAt: new Date(),
      thumbnail: "/assets/blog-2.jpg",
    },
    {
      id: "gfhkfgjdfg",
      author: "Comify Chat",
      title: "12 Essential Performance Metrics for Customer Service",
      createdAt: new Date(),
      thumbnail: "/assets/blog-3.jpg",
    },
  ]);
  return (
    <ul className={s.cards}>
      {blogs.map((blog) => (
        <li key={blog.id} className={s.card}>
          <Link href="/">
            <img src={blog.thumbnail} />
          </Link>
          <div className={s.metadata}>
            {blog.author} |{" "}
            <Moment format="MMM DD, YYYY">{blog.createdAt}</Moment>
          </div>
          <Link href="/">
            <h3 className={space_grotesk.className}>{blog.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const UserOptions = () => {
  const { user, setUser } = useContext(SiteContext);
  const { post: logout, loading } = useFetch(endpoints.logout);
  const router = useRouter();
  return !user ? (
    <>
      <Link href={paths.login}>
        <button className="btn clear white">Sign in</button>
      </Link>
      <Link href={paths.register}>
        <button className="btn secondary">Get Started</button>
      </Link>
    </>
  ) : (
    <Menu
      className={s.avatar}
      button={
        <button className={`btn clear small white ${s.avatar}`}>
          {/* <span>{user?.name}</span> */}
          <HiUserCircle />
        </button>
      }
      options={[
        {
          label: "Settings",
          component: <Link href={paths.account}>Account</Link>,
        },
        {
          label: "Dashboard",
          component: <Link href={paths.topics}>Dashboard</Link>,
        },
        {
          label: "divider",
          component: <hr />,
        },
        {
          label: "Logout",
          onClick: () => {
            logout()
              .then(({ data }) => {
                if (data.success) {
                  setUser(null);
                  localStorage.removeItem("access_token");
                  router.push(paths.home);
                }
              })
              .catch((err) => Prompt({ type: "error", message: err.message }));
          },
        },
      ]}
    />
  );
};

export const RightSection = () => {
  const { user } = useContext(SiteContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className={`${s.right} ${sidebarOpen ? s.open : ""}`}>
        {user ? (
          <UserOptions />
        ) : (
          <button
            className={`${s.menuBtn} btn clear small white`}
            onClick={() => setSidebarOpen(true)}
          >
            <GiHamburgerMenu />
          </button>
        )}
        <div className={s.nav} onClick={() => setSidebarOpen(false)}>
          <UserOptions />
        </div>
      </div>
      <div
        className={`${s.backdrop} ${sidebarOpen ? s.open : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
};
