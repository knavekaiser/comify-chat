"use client";

import s from "./page.module.scss";
import { CoreFeatures, Testimonials, Blogs, Platforms } from "./components";
import Link from "next/link";
import paths from "@/utils/paths";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const inViewFadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { ease: [0, 0.55, 0.45, 1], duration: 0.5 },
  viewport: { once: true, margin: "-100px" },
};

export default function Home() {
  const videoContainer = useRef();
  const mainContainer = useRef();
  const [videoInView, setVideoInView] = useState(false);
  const [manualCtrl, setManualCtrl] = useState(false);
  const video = useRef();
  useEffect(() => {
    video.current.volume = 0.02;
    const body = document.querySelector("body");
    const scrollHandler = (e) => {
      if (videoContainer.current) {
        const bound = videoContainer.current?.getBoundingClientRect();
        const buffer = 200;
        const inview =
          bound.y + buffer < window.innerHeight &&
          bound.y + bound.height > buffer;
        setVideoInView(inview);
      }
    };
    body.addEventListener("scroll", scrollHandler);
    return () => {
      body.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  useEffect(() => {
    if (!manualCtrl) {
      if (videoInView) {
        video.current.play();
      } else {
        video.current.pause();
      }
    }
  }, [videoInView]);
  return (
    <main className={s.main} ref={mainContainer}>
      <div className={s.hero}>
        <div className={s.innerWrapper}>
          <div className={s.content}>
            <motion.h1 {...inViewFadeIn}>
              Empower Your Business with
              <br /> Infin AI Today!
            </motion.h1>
            <motion.p
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.5 }}
            >
              Revolutionize Customer Engagement with Infin AI&apos;s Chatbot
              Service. Effortlessly Create Chatbots from Documents or Existing
              Websites - No Code Required. Supercharge Your Business Today!
            </motion.p>
            <motion.div
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.75 }}
              className={s.cla}
            >
              <Link href={paths.register}>
                <button className="btn primary">
                  Start Free 14 Days Trial!
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            {...inViewFadeIn}
            initial={{ opacity: 0, y: -50 }}
            className={s.bennerWrapper}
          >
            {/* <span className={s.box1} /> */}
            <motion.div
              animate={{ y: 10 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: [0.83, 0, 0.17, 1],
              }}
              className={s.box2}
            />
            <motion.img
              animate={{ y: -15, x: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: [0.83, 0, 0.17, 1],
              }}
              alt="benner"
              className={s.avatarFull}
              src="/assets/avatar_full.png"
            />
            <img
              initial={{ opacity: 0 }}
              alt="benner"
              src="/assets/chat_ui.png"
              className={s.chatUi}
            />
          </motion.div>
        </div>
      </div>

      <div className={s.video_demo}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn}>Video Demo</motion.h2>
          <motion.p {...inViewFadeIn} className={s.dscr}>
            Creating a chatbot for your website by uploading word document and
            training the AI on its content. You can then embed the chatbot on
            the website!
          </motion.p>

          <div
            className={s.video}
            ref={videoContainer}
            onClick={() => setManualCtrl(true)}
          >
            <video
              src="/assets/video-tutorial.mp4"
              controls
              ref={video}
              muted
            />
          </div>
        </div>
        <div id="chatContainer" />
      </div>

      <div className={s.intro}>
        <div className={s.innerWrapper}>
          <div className={s.content}>
            <motion.h2 {...inViewFadeIn}>
              Start conversations, win loyal customers
            </motion.h2>
            <motion.p {...inViewFadeIn}>
              Chat with customers. Solve their problems in real time. Offer
              custom discounts based on browsing history. And make product
              recommendations based on their behavior.
            </motion.p>

            <ul>
              <motion.li
                key="accuracy"
                {...inViewFadeIn}
                transition={{ ...inViewFadeIn.transition, delay: 0.2 }}
              >
                ✅ Automate up to 47%
              </motion.li>
              <motion.li
                key="visitor"
                {...inViewFadeIn}
                transition={{ ...inViewFadeIn.transition, delay: 0.4 }}
              >
                ✅ Turn visitors into paying customers
              </motion.li>
              <motion.li
                key="supercharge"
                {...inViewFadeIn}
                transition={{ ...inViewFadeIn.transition, delay: 0.6 }}
              >
                ✅ Supercharge your customer service team
              </motion.li>
            </ul>

            <motion.div
              {...inViewFadeIn}
              className={s.cla}
              transition={{ ...inViewFadeIn.transition, delay: 0.8 }}
            >
              <Link href={paths.register}>
                <button className="btn primary">Get Started today!</button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            {...inViewFadeIn}
            viewport={{ ...inViewFadeIn.viewport, margin: "-200px" }}
            className={s.bennerWrapper}
          >
            <img
              className={s.uiEmpty}
              alt="chat-preview"
              src="/assets/chat_ui_empty.png"
            />
            <motion.img
              animate={{ y: 10, x: -10 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: "easeInOut",
              }}
              className={s.uiMessages}
              alt="chat-preview"
              src="/assets/chat_ui_messages.png"
            />
          </motion.div>
        </div>
      </div>

      <div className={s.key_features}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn}>
            Unlock the Power of Infin AI: <br />
            Key Features at a Glance
          </motion.h2>
          <motion.p {...inViewFadeIn} className={s.dscr}>
            Discover the exceptional features that set Infin AI apart. From
            automation and personalization to knowledge and seamless
            integration, experience the full potential of our chatbot service in
            just a glance.
          </motion.p>

          <ul className={s.cards}>
            <motion.li
              key="automate"
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0 }}
              className={s.card}
            >
              <img src="/assets/stickers/automation.png" />
              <h3>Automate</h3>
              <p>Streamline, save time with AI-driven customer interactions.</p>
            </motion.li>
            <motion.li
              key="tailored"
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.2 }}
              className={s.card}
            >
              <img src="/assets/stickers/equalizer.png" />
              <h3>Tailored</h3>
              <p>
                Tailor experiences to individual customers, foster deeper
                connections.
              </p>
            </motion.li>
            <motion.li
              key="informed"
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.4 }}
              className={s.card}
            >
              <img src="/assets/stickers/data-analytics.png" />
              <h3>Analytics</h3>
              <p>
                Data-driven insights for optimizing chatbot performance and
                customer engagement.
              </p>
            </motion.li>
            <motion.li
              key="seamless"
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.6 }}
              className={s.card}
            >
              <img src="/assets/stickers/abstract-shape.png" />
              <h3>Seamless</h3>
              <p>
                Seamless implementation for effortless chatbot integration on
                your website.
              </p>
            </motion.li>
          </ul>
        </div>
      </div>

      <div className={s.core_features}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn}>
            What’s included: core features
          </motion.h2>
          <motion.p {...inViewFadeIn} className={s.dscr}>
            Adjust the chat window design to fit your brand and style.
          </motion.p>

          <CoreFeatures />
        </div>
      </div>

      <div className={s.testimonials}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn}>
            See why other businesses <br />
            like you have chosen Infin AI
          </motion.h2>
          <motion.p {...inViewFadeIn} className={s.dscr}>
            Top-rated on Trustpilot, G2, and AppSumo
          </motion.p>

          <Testimonials />
        </div>
      </div>

      <div className={s.platform_section}>
        <div className={s.innerWrapper}>
          <h2>Your tools don&apos;t have to Change</h2>
          <p className={s.dscr}>Infin AI integrates with your favorite tools</p>

          <Platforms />
        </div>
      </div>

      <div className={s.blog_section}>
        <div className={s.innerWrapper}>
          <h2>Latest updates</h2>
          <p className={s.dscr}>
            Transforming the way customers contact brands online.
          </p>

          <Blogs />
        </div>
      </div>

      <div className={s.grid}></div>
    </main>
  );
}
