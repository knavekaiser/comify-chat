import s from "./page.module.scss";

const encouragement = [
  {
    title: "Ask",
    description:
      "Post your questions and receive answers from the community members and our expert team.",
  },
  {
    title: "Share",
    description:
      "Share your experiences, tips, and success stories related to AI chatbots.",
  },
  {
    title: "Learn",
    description:
      "Dive into resources shared by others, gain insights from diverse perspectives, and keep yourself updated with industry trends.",
  },
  {
    title: "Connect",
    description:
      "Engage with like-minded individuals, create meaningful relationships, and expand your network.",
  },
];

export const metadata = {
  title: "Infin AI | Community",
  description:
    "Welcome to the Infin AI Community: Unite, Share, and Grow Together. Connect with like-minded professionals, exchange ideas, and foster innovation in the realm of AI-powered chatbots. Let's build a vibrant community!",
};

export default function Login() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <header>
          <h1>Community</h1>
          <p>
            Welcome to the Infin AI Community: Unite, Share, and Grow Together.
          </p>
        </header>

        <section className={s.section}>
          <p>
            Welcome to our thriving AI Chatbot Community! This is a space
            designed for business professionals, technologists, AI enthusiasts,
            and our valued customers to connect, share knowledge, and grow
            together in the fascinating world of AI chatbots.
          </p>

          <p>
            Our community is built on the principles of mutual learning,
            sharing, and progression. Here, you can explore discussion threads,
            find answers to your questions, share your success stories, and
            learn about the latest trends and best practices in the AI chatbot
            industry.
          </p>

          <p>
            We believe in the power of collective intelligence, and this
            community is a testament to that belief. Whether you're a newbie
            navigating your first chatbot project or a seasoned professional
            with insights to share, there's a place for you here.
          </p>

          <p>
            In addition to peer-to-peer interactions, our expert team also
            actively participates in the community. They provide insights,
            answer queries, and occasionally host exclusive webinars and AMA
            (Ask Me Anything) sessions.
          </p>
        </section>

        <section className={s.section}>
          <h2>We encourage you to</h2>
          <div className={s.encouragement}>
            {encouragement.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <p>
            Our community is respectful, inclusive, and supportive. We're all
            here to help each other grow and succeed in our AI journey. So, get
            involved, start a discussion, share your thoughts, and let's grow
            together!
          </p>

          <p>
            Remember, the community rules and guidelines should be clearly
            defined to maintain a respectful and productive environment. You may
            need to modify this draft to suit your specific community policies
            and objectives.
          </p>
        </section>
      </div>
    </main>
  );
}
