"use client";
import { useContext, useEffect, useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

const inViewFadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { ease: [0.61, 1, 0.88, 1], duration: 0.75 },
  viewport: { once: true, margin: "-100px" },
};
const inViewScaleIn = {
  initial: { opacity: 0, scale: 0 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { ease: [0.61, 1, 0.88, 1], duration: 0.75 },
  viewport: { once: true, margin: "-100px" },
};
const featureCardsFadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { ease: [0.61, 1, 0.88, 1], duration: 0.75 },
  viewport: { once: true, margin: "-100px" },
};

export const CoreFeatures = () => {
  const [features, setFeatures] = useState([
    {
      title: "Easy Implementation",
      description: `Streamlined Documentation for Simple Integration`,
      image: "/assets/code.png",
    },
    {
      title: "Topic Management",
      description: `Simplified UI for Effective Topic Organization`,
      image: "/assets/topic_management.png",
    },
    {
      title: "Chat Management",
      description: `Efficiently Oversee AI-Driven Customer Interactions`,
      image: "/assets/chat_management.png",
    },
  ]);
  const [active, setActive] = useState(features[0]);

  return (
    <div className={s.content}>
      <motion.div key="avatar" {...inViewFadeIn} className={s.imageWrapper}>
        <img src="/assets/avatar_1.png" />
      </motion.div>
      <motion.div
        key="view"
        className={s.featureDetail}
        {...inViewFadeIn}
        transition={{ ...featureCardsFadeIn.transition, delay: 0.2 }}
      >
        {active && <img src={active.image} />}
      </motion.div>
      <ul className={s.cards}>
        {features.map((item, i) => (
          <motion.li
            key={item.title}
            {...featureCardsFadeIn}
            transition={{
              ...featureCardsFadeIn.transition,
              delay: 0.4 + 0.2 * i,
            }}
            className={`${s.card} ${
              active?.title === item.title ? s.active : ""
            }`}
            onClick={() => setActive(item)}
          >
            <h4 className={space_grotesk.className}>{item.title}</h4>
            <p>{item.description}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      _id: "1",
      user: {
        name: "Jane F.",
        role: "CEO, TechStart Inc.",
        image: "/assets/img/testimonials/avatar_1.png",
      },
      content:
        "Our organization was delighted to discover how effortlessly we could integrate the AI chatbot into our website. The transition was smooth and seamless. It felt like adding a new team member, only faster and more efficient!",
    },
    {
      _id: "2",
      user: {
        name: "David L.",
        role: "CEO, EComm Ventures",
        image: "/assets/img/testimonials/avatar_2.png",
      },
      content:
        "The ability to establish our own knowledge base has been a game-changer for us. It's like having a virtual assistant on standby, ready to answer our clients' questions with the utmost precision. This AI chatbot has become a vital part of our customer service.",
    },
    {
      _id: "3",
      user: {
        name: "Susan M.",
        role: "CEO, FinEdge Corp.",
        image: "/assets/img/testimonials/avatar_3.png",
      },
      content:
        "Customizing the user experience was a breeze. We were able to match the chatbot's look and feel to our site, providing a consistent brand experience for our visitors. It's this attention to detail that sets this AI chatbot apart.",
    },
    {
      _id: "4",
      user: {
        name: "Kevin P.",
        role: "CEO, Apex Marketing Group",
        image: "/assets/img/testimonials/avatar_4.png",
      },
      content:
        "The insights we've gained from the analytics are nothing short of invaluable. We now understand our customers' needs better, and it's all thanks to the in-depth data provided by the AI chatbot. It's truly a marketer's dream come true.",
    },
    {
      _id: "5",
      user: {
        name: "Helen S.",
        role: "CEO, Omni Health Solutions",
        image: "/assets/img/testimonials/avatar_5.png",
      },
      content:
        "One of the highlights of using this AI chatbot was how straightforward it made setting up our knowledge base. We had it up and running in no time, ready to help our customers. It's as easy as it gets!",
    },
    {
      _id: "6",
      user: {
        name: "Richard B.",
        role: "CEO, GreenLight Media",
        image: "/assets/img/testimonials/avatar_6.png",
      },
      content:
        "We were impressed by the smoothness of integrating this AI chatbot into our website. It was like plugging in an extension, a very intelligent one. The ease of use exceeded our expectations.",
    },
    {
      _id: "7",
      user: {
        name: "Sophia N.",
        role: "CEO, Inspire Design Studio",
        image: "/assets/img/testimonials/avatar_7.png",
      },
      content:
        "The ability to customize the chatbot to match our website was exceptional. It's like having a digital concierge that not only fits our brand but also knows exactly how to assist our customers.",
    },
    {
      _id: "8",
      user: {
        name: "Lucas M.",
        role: "CEO, Quantum Analytics",
        image: "/assets/img/testimonials/avatar_8.png",
      },
      content:
        "Having analytics at our fingertips has been a revelation. We've gained insights into our customer queries that we could never have understood otherwise. The satisfaction ratings have helped us understand and enhance our user experience.",
    },
    {
      _id: "9",
      user: {
        name: "Ethan W.",
        role: "CEO, LogicPro IT",
        image: "/assets/img/testimonials/avatar_9.png",
      },
      content:
        "Being able to establish our own knowledge base with this AI chatbot was incredibly straightforward. We could tailor the chatbot to our clients' needs in no time. It's truly user empowerment at its finest.",
    },
    {
      _id: "10",
      user: {
        name: "Charlotte D.",
        role: "CEO, DreamHomes Realty",
        image: "/assets/img/testimonials/avatar_10.png",
      },
      content:
        "This AI chatbot isn't just easy to integrate and customize, it's an invaluable tool for understanding our customers better. The insights provided by the analytics have helped us tailor our services to better meet our clients' needs. It's like having a personal advisor for our business!",
    },
  ]);
  const [cardWidth, setCardWidth] = useState(3.5);

  return (
    <Carousel
      className={s.cards}
      showDots
      dotListClass={s.dots}
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 2100 },
          items: 6,
        },
        extraLargeDesktop: {
          breakpoint: { max: 2100, min: 1700 },
          items: 5,
        },
        largeDesktop: {
          breakpoint: { max: 1700, min: 1250 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 1250, min: 900 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 900, min: 600 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 600, min: 0 },
          items: 1,
        },
      }}
    >
      {testimonials.map((item, i) => (
        <motion.div
          {...inViewScaleIn}
          viewport={{ once: false, margin: "-100px" }}
          transition={{
            ...inViewFadeIn.transition,
          }}
          key={item._id}
          className={`${s.card}`}
        >
          <p>{item.content}</p>
          <div className={s.profile}>
            <Image
              height={50}
              width={50}
              src={item.user?.image}
              alt={`${item.user.name} photo`}
            />
            <div className={s.detail}>
              <h4 className={s.name}>{item.user.name}</h4>
              <p className={s.role}>{item.user.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </Carousel>
  );
};

export const Platforms = () => {
  const [platforms, setPlatforms] = useState([
    {
      id: "wordpress",
      img: "/assets/img/platforms/wordpress.webp",
      url: "#",
      message: "Add an AI chatbot to your WordPress website",
    },
    {
      id: "zapier",
      img: "/assets/img/platforms/zapier.webp",
      url: "#",
      message: "Connect your chatbot to 5000+ apps on Zapier",
    },
    {
      id: "slack",
      img: "/assets/img/platforms/slack.webp",
      url: "#",
      message: "Coming soon...",
    },
    {
      id: "shopify",
      img: "/assets/img/platforms/shopify.webp",
      url: "#",
      message: "Coming soon...",
    },
  ]);
  return (
    <ul className={`${s.cards} ${s.platfomrs}`}>
      {platforms.map((pl, i) => (
        <motion.li
          {...inViewScaleIn}
          transition={{
            ...inViewFadeIn.transition,
            delay: 0.2 * i,
          }}
          key={pl.id}
          className={s.card}
        >
          <a href={pl.url}>
            <Image
              height={68}
              width={180}
              src={pl.img}
              alt={`${pl.id + " logo"}`}
              objectFit="contain"
            />
            <p>{pl.message}</p>
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { get: getBlogs, loading } = useFetch(endpoints.blogs);
  useEffect(() => {
    getBlogs()
      .then(({ data }) => {
        if (data.success) {
          setBlogs(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Carousel
      showDots
      dotListClass={s.dots}
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 2100 },
          items: 6,
        },
        extraLargeDesktop: {
          breakpoint: { max: 2100, min: 1700 },
          items: 5,
        },
        largeDesktop: {
          breakpoint: { max: 1700, min: 1250 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 1250, min: 900 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 900, min: 600 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 600, min: 0 },
          items: 1,
        },
      }}
      className={`${s.cards} ${s.blogs}`}
    >
      {blogs.map((blog, i) => (
        <motion.div
          {...inViewScaleIn}
          viewport={{ once: false, margin: "-100px" }}
          transition={{
            ...inViewFadeIn.transition,
          }}
          key={blog._id}
          className={s.card}
        >
          <Link href={"/blogs" + blog.path}>
            {blog.thumbnail ? (
              <img src={endpoints.baseUrl + blog.thumbnail.url} />
            ) : (
              <img src={"/assets/blog_fallback.jpg"} />
            )}
          </Link>
          <div className={s.metadata}>
            {/* {blog.author} |{" "} */}
            <Moment format="MMM DD, YYYY">{blog.createdAt}</Moment>
          </div>
          <Link href={"/blogs" + blog.path}>
            <h3 className={space_grotesk.className}>{blog.title}</h3>
          </Link>
        </motion.div>
      ))}
    </Carousel>
  );
};

export const Avatar = () => {
  const { setUser } = useContext(SiteContext);
  const { post: logout, loading } = useFetch(endpoints.logout);
  const router = useRouter();
  return (
    <Menu
      className={s.avatar}
      button={
        <button className={`btn clear small white ${s.avatar}`}>
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
          <Avatar />
        ) : (
          <button
            className={`${s.menuBtn} btn clear small white`}
            onClick={() => setSidebarOpen(true)}
          >
            <GiHamburgerMenu />
          </button>
        )}
        <div className={s.nav} onClick={() => setSidebarOpen(false)}>
          {!user && (
            <>
              <Link href={paths.login}>
                <button className="btn clear white">Sign in</button>
              </Link>
              <Link href={paths.register}>
                <button className="btn primary white">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
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
    </>
  );
};
