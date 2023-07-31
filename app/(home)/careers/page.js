import s from "./page.module.scss";

const positions = [
  {
    img: "/assets/pc.png",
    title: "Digital Marketing Executive",
    description:
      "We're seeking a highly-motivated Digital Marketing Executive to join our team. In this role, you will work closely with the marketing team to develop and implement digital marketing strategies to drive traffic, generate leads, and increase brand awareness.",
    resp: [
      "Develop, implement, and manage marketing campaigns that promote our AI chatbot solutions.",
      "Evaluate and report performance of all digital marketing campaigns.",
      "Create and manage link building strategies, content marketing strategies, and social media presences.",
      "Forecast marketing campaign growth and ROI for marketing campaigns.",
    ],
    req: [
      "Proven experience in digital marketing, particularly within the industry.",
      "Familiarity with Google Ads, Facebook Ads, SEO, and other digital marketing platforms.",
      "Strong written and verbal communication skills.",
    ],
  },
  {
    img: "/assets/support.png",
    title: "Customer Support Executive:",
    description:
      "We're looking for a Customer Support Executive to provide exceptional customer service and support for our AI chatbot users. In this role, you'll be the first point of contact for our clients, providing assistance and solutions for their queries.",
    resp: [
      "Providing timely and accurate customer feedback.",
      "Communicating with customers through various channels.",
      "Acknowledging and resolving customer complaints.",
      "Ensuring customer satisfaction and providing professional customer support.",
    ],
    req: [
      "Prior customer support experience.",
      "Strong communication skills.",
      "Ability to stay calm when customers are stressed or upset.",
      "Comfortable using computers and mobile devices to interact with our system and aid customers.",
    ],
  },
];

export const metadata = {
  title: "Infin AI | Careers",
  description:
    "Join Our Team: Fuel Innovation and Shape the Future. Explore exciting opportunities at Infin AI and make an impact in the world of AI-driven customer engagement. Start your journey today!",
};

export default function Login() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <header>
          <h1>Careers</h1>
          <p>Join Our Team: Fuel Innovation and Shape the Future.</p>
        </header>

        {positions.map((item) => (
          <section key={item.title} className={s.section}>
            <div className={s.head}>
              <img src={item.img} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            <h4>Responsibilities</h4>
            <ul>
              {item.resp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4>Requirements</h4>
            <ul>
              {item.req.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className={s.section}>
          <p>
            At our company, we&apos;re committed to creating a diverse,
            inclusive environment where everyone feels they belong. We value the
            fresh ideas and unique perspectives a diverse group of individuals
            can bring to our company. If you&apos;re passionate about AI and
            excited about shaping the future of customer interactions, we&apos;d
            love to hear from you!
          </p>
        </section>
      </div>
    </main>
  );
}
