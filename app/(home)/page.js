import { Space_Grotesk } from "next/font/google";
import s from "./page.module.scss";
import { CoreFeatures, Testimonials, Blogs } from "./components";
import Link from "next/link";
import paths from "@/utils/paths";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.hero}>
        <div className={s.innerWrapper}>
          <div className={s.content}>
            <h1 className={space_grotesk.className}>
              Empower Your Business with AI-Powered Comify Chat Today!
            </h1>
            <p>
              Revolutionize customer engagement and supercharge your business
              with Comify Chat&apos;s AI-powered chatbot service. Enhance sales,
              streamline support, and maximize growth with our cutting-edge
              technology. Get started now!
            </p>
            <div className={s.cla}>
              <Link href={paths.register}>
                <button className="btn primary">
                  Start Free 14 Days Trial!
                </button>
              </Link>
            </div>
          </div>
          <div className={s.bennerWrapper}>
            {/* <span className={s.box1} /> */}
            <span className={s.box2} />
            <img
              alt="benner"
              className={s.avatarFull}
              src="/assets/avatar_full.png"
            />
            <img alt="benner" src="/assets/chat_ui.png" className={s.chatUi} />
          </div>
        </div>
      </div>

      <div className={s.section_one}>
        <div className={s.innerWrapper}>
          <div className={s.content}>
            <h2 className={space_grotesk.className}>
              Start conversations, win loyal customers
            </h2>
            <p>
              Chat with customers. Solve their problems in real time. Offer
              custom discounts based on browsing history. And make product
              recommendations based on their behavior.
            </p>

            <ul>
              <li>✅ Automate up to 47%</li>
              <li>✅ Turn visitors into paying customers</li>
              <li>✅ Supercharge your customer service team</li>
            </ul>

            <div className={s.cla}>
              <Link href={paths.register}>
                <button className="btn primary">Get Started today!</button>
              </Link>
            </div>
          </div>
          <div className={s.bennerWrapper}>
            <img
              className={s.uiEmpty}
              alt="chat-preview"
              src="/assets/chat_ui_empty.png"
            />
            <img
              className={s.uiMessages}
              alt="chat-preview"
              src="/assets/chat_ui_messages.png"
            />
          </div>
        </div>
      </div>

      <div className={s.section_two}>
        <div className={s.innerWrapper}>
          <h2 className={space_grotesk.className}>
            Unlock the Power of Comify Chat: <br />
            Key Features at a Glance
          </h2>
          <p className={s.dscr}>
            Discover the exceptional features that set Comify Chat apart. From
            automation and personalization to knowledge and seamless
            integration, experience the full potential of our chatbot service in
            just a glance.
          </p>

          <ul className={s.cards}>
            <li className={s.card}>
              <img src="/assets/stickers/automation.png" />
              <h3 className={space_grotesk.className}>Automate</h3>
              <p>Streamline, save time with AI-driven customer interactions.</p>
            </li>
            <li className={s.card}>
              <img src="/assets/stickers/equalizer.png" />
              <h3 className={space_grotesk.className}>Tailored</h3>
              <p>
                Tailor experiences to individual customers, foster deeper
                connections.
              </p>
            </li>
            <li className={s.card}>
              <img src="/assets/stickers/about.png" />
              <h3 className={space_grotesk.className}>Informed</h3>
              <p>Insightful responses fueled by document-based intelligence.</p>
            </li>
            <li className={s.card}>
              <img src="/assets/stickers/abstract-shape-1.png" />
              <h3 className={space_grotesk.className}>Seamless</h3>
              <p>
                Seamless implementation for effortless chatbot integration on
                your website.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.section_three}>
        <div className={s.innerWrapper}>
          <h2 className={space_grotesk.className}>
            What’s included: core features
          </h2>
          <p className={s.dscr}>
            Adjust the chat window design to fit your brand and style.
          </p>

          <CoreFeatures />
        </div>
      </div>

      <div className={s.section_four}>
        <div className={s.innerWrapper}>
          <h2 className={space_grotesk.className}>
            See why 500,000+ professionals <br />
            like you have chosen OpenUp
          </h2>
          <p className={s.dscr}>Top-rated on Trustpilot, G2, and AppSumo</p>

          <Testimonials />
        </div>
      </div>

      <div className={s.section_five}>
        <div className={s.innerWrapper}>
          <h2 className={space_grotesk.className}>Latest updates</h2>
          <p className={s.dscr}>
            Since 2003, we have been transforming the way
            <br />
            customers contact brands online.
          </p>

          <Blogs />
        </div>
      </div>

      <div className={s.grid}></div>
    </main>
  );
}
