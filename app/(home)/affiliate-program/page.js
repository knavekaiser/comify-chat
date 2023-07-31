import s from "./page.module.scss";

export const metadata = {
  title: "Infin AI | Affiliate Program",
  description:
    "Join Our Lucrative Affiliate Program and Earn Big! Partner with Infin AI to spread the AI-powered chatbot revolution, and enjoy generous commissions on every successful referral. Start earning now!",
};

export default function Login() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <header>
          <h1>Affiliate Program</h1>
          <p>Join Our Lucrative Affiliate Program and Earn Big!</p>
        </header>

        <div className={s.content}>
          <p>
            Join our Affiliate Program and become a part of the rapidly growing
            AI chatbot industry. Our Affiliate Program is designed for
            individuals, businesses, and organizations who want to turn their
            network and knowledge into revenue.
          </p>

          <p>
            As an affiliate partner, you'll earn a competitive commission for
            each new customer you refer who signs up for our AI chatbot
            solutions. Whether you're a blogger, content creator, consultant, or
            a business catering to a similar industry, our program is an
            excellent way to supplement your income while providing value to
            your audience.
          </p>

          <p>
            The process is simple: Once you sign up, we'll provide you with a
            unique referral link and promotional materials to help you get
            started. When someone signs up using your link, you'll earn a
            commission. We offer real-time tracking so you can see your
            referrals and commissions at any time.
          </p>

          <p>
            But our Affiliate Program is about more than just earning money.
            It's also about sharing innovative technology and helping businesses
            provide better customer experiences. When you join our Affiliate
            Program, you're not just promoting a product - you're promoting a
            solution that can truly make a difference.
          </p>

          <p>
            In addition, we offer dedicated support to our affiliates, ensuring
            that you have all the resources you need to succeed. This includes
            promotional materials, regular updates on our product, and tips for
            maximizing your earning potential.
          </p>

          <p>
            Join us today, and let's grow together in this exciting AI journey!
          </p>
        </div>
      </div>
    </main>
  );
}
