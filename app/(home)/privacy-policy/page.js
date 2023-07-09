import { Space_Grotesk } from "next/font/google";
import s from "./page.module.scss";
const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

const policies = [
  {
    title: "Information Collection",
    description:
      "We may collect personal information such as your name, email address, and contact details when you sign up for an account or interact with our services. Additionally, we may collect non-personal information such as cookies and usage data to enhance your experience.",
  },
  {
    title: "Use of Information",
    description:
      "We use the information collected to provide and improve our services, personalize your experience, communicate with you, and analyze usage patterns. We may also use the information for marketing purposes, with your consent, to inform you about our products and promotions.",
  },
  {
    title: "Data Sharing",
    description:
      "We do not sell, rent, or trade your personal information to third parties. However, we may share certain information with trusted service providers who assist us in operating our business and delivering services to you. These third-party providers are obligated to maintain the confidentiality and security of your information.",
  },
  {
    title: "Data Security",
    description:
      "We implement strict security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Data Retention",
    description:
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Upon your request, we will delete or anonymize your personal data, subject to certain legal obligations and legitimate business interests.",
  },
  {
    title: "Third-Party Links",
    description:
      "Our services may contain links to third-party websites or services that are not operated or controlled by Comify Chat. This Privacy Policy does not apply to those third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites you visit.",
  },
  {
    title: "Children's Privacy",
    description:
      "Comify Chat does not knowingly collect or solicit personal information from children under the age of 13. If you believe that we have inadvertently collected personal information from a child, please contact us, and we will take immediate steps to delete the information.",
  },
  {
    title: "Changes to the Privacy Policy",
    description:
      "e may update or revise this Privacy Policy from time to time. Any changes will be effective upon posting on our website. We recommend reviewing this policy periodically to stay informed about our data practices.",
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or the privacy practices of Comify Chat, please contact us using the provided contact information. We will respond to your inquiries as soon as possible.",
  },
];

export default function Login() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <header>
          <h1 className={space_grotesk.className}>Terms & Conditions</h1>
          <p>
            Please read and agree to our privacy policy before using our
            services.
          </p>
        </header>

        {policies.map((item) => (
          <section key={item.title} className={s.section}>
            <h3 className={space_grotesk.className}>{item.title}</h3>
            <p>{item.description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
