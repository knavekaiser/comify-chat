"use client";

import { Space_Grotesk } from "next/font/google";
import s from "./page.module.scss";
import { CoreFeatures, Testimonials, Blogs } from "./components";
import Link from "next/link";
import paths from "@/utils/paths";
import { motion } from "framer-motion";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

const inViewFadeIn = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { ease: [0, 0.55, 0.45, 1], duration: 0.5 },
  viewport: { once: true, margin: "-100px" },
};

export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.hero}>
        <div className={s.innerWrapper}>
          <div className={s.content}>
            <motion.h1 {...inViewFadeIn} className={space_grotesk.className}>
              Empower Your Business with AI-Powered Infin AI Today!
            </motion.h1>
            <motion.p
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.5 }}
            >
              Revolutionize customer engagement and supercharge your business
              with Infin AI&apos;s AI-powered chatbot service. Enhance sales,
              streamline support, and maximize growth with our cutting-edge
              technology. Get started now!
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

      <div className={s.section_one}>
        <div className={s.innerWrapper}>
          <div className={s.content}>
            <motion.h2 {...inViewFadeIn} className={space_grotesk.className}>
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

      <div className={s.section_two}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn} className={space_grotesk.className}>
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
              <h3 className={space_grotesk.className}>Automate</h3>
              <p>Streamline, save time with AI-driven customer interactions.</p>
            </motion.li>
            <motion.li
              key="tailored"
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.2 }}
              className={s.card}
            >
              <img src="/assets/stickers/equalizer.png" />
              <h3 className={space_grotesk.className}>Tailored</h3>
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
              <img src="/assets/stickers/about.png" />
              <h3 className={space_grotesk.className}>Informed</h3>
              <p>Insightful responses fueled by document-based intelligence.</p>
            </motion.li>
            <motion.li
              key="seamless"
              {...inViewFadeIn}
              transition={{ ...inViewFadeIn.transition, delay: 0.6 }}
              className={s.card}
            >
              <img src="/assets/stickers/abstract-shape-1.png" />
              <h3 className={space_grotesk.className}>Seamless</h3>
              <p>
                Seamless implementation for effortless chatbot integration on
                your website.
              </p>
            </motion.li>
          </ul>
        </div>
      </div>

      <div className={s.section_three}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn} className={space_grotesk.className}>
            What’s included: core features
          </motion.h2>
          <motion.p {...inViewFadeIn} className={s.dscr}>
            Adjust the chat window design to fit your brand and style.
          </motion.p>

          <CoreFeatures />
        </div>
      </div>

      <div className={s.section_four}>
        <div className={s.innerWrapper}>
          <motion.h2 {...inViewFadeIn} className={space_grotesk.className}>
            See why other businesses <br />
            like you have chosen InfinAI
          </motion.h2>
          <motion.p {...inViewFadeIn} className={s.dscr}>
            Top-rated on Trustpilot, G2, and AppSumo
          </motion.p>

          <Testimonials />
        </div>
      </div>

      <div className={s.section_five}>
        <div className={s.innerWrapper}>
          <h2 className={space_grotesk.className}>Latest updates</h2>
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
