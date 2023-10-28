import s from "./page.module.scss";
import Link from "next/link";
import paths from "@/utils/paths";

const terms = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing or using the services provided by Infin AI, you agree to comply with the following Terms and Conditions. These terms apply to all users and visitors of our website and services. If you do not agree with any of these terms, please refrain from using our services.",
  },
  {
    title: "Service Description",
    description:
      "Infin AI offers AI-powered chatbot solutions designed to enhance customer engagement and support on websites. Our services utilize advanced technology to provide features such as automation, personalization, and knowledge-based responses. By implementing our chatbot service, businesses can streamline their customer interactions and deliver tailored experiences.",
  },
  {
    title: "User Responsibilities",
    description:
      "As a user of Infin AI's services, you are responsible for maintaining the security of your account credentials. You agree not to misuse or interfere with the services or the experience of other users. It is important to protect your login information and promptly notify us if you suspect any unauthorized access or suspicious activities related to your account.",
  },
  {
    title: "Intellectual Property",
    description:
      "All intellectual property rights related to our services, including software, logos, content, and any other materials, are the property of Infin AI or its licensors. These materials are protected by copyright and other applicable laws. You may not reproduce, distribute, modify, or create derivative works from any part of our services without obtaining explicit permission from us.",
  },
  {
    title: "Privacy",
    description: (
      <>
        Infin AI values your privacy and is committed to protecting your
        personal information. We handle your data in accordance with our Privacy
        Policy, which outlines the types of information we collect, how we use
        it, and the circumstances under which we may disclose it. By using our
        services, you consent to the collection, use, and disclosure of your
        personal information as described in our{" "}
        <Link href={paths.privacyPolicy} target="_blank">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    title: "Limitation of Liability",
    description:
      "In no event shall Infin AI be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to the use or inability to use our services. This includes damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages. Your use of our services is at your own risk, and any reliance you place on the information provided is solely your responsibility.",
  },
  {
    title: "Termination",
    description:
      "Infin AI reserves the right to terminate or suspend access to our services at any time, with or without cause or notice. We may take this action if we believe you have violated these Terms and Conditions or if we need to protect the security or integrity of our services. Upon termination, your right to use the services will cease, and you must immediately cease all use of our services.",
  },
  {
    title: "Modifications",
    description:
      "Infin AI may update or modify these Terms and Conditions from time to time. Any changes will be effective upon posting on our website. It is your responsibility to review these terms periodically to stay informed about any updates or modifications. Your continued use of our services after any changes have been made constitutes your acceptance of the revised Terms and Conditions.",
  },
  {
    title: "Governing Law",
    description:
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in India.",
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions, concerns, or inquiries regarding these Terms and Conditions, please do not hesitate to contact us. You can reach us at support@infinai.in, and we will be happy to assist you.",
  },
];

export const metadata = {
  title: "Infin AI | Terms & Conditions",
  description:
    "This page outlines the terms of use for Infin AI's services. Please review and comply with these terms when accessing and utilizing our offerings.",
};

export default function Login() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <header>
          <h1>Terms & Conditions</h1>
          <p>Please read and agree to our terms before using our services.</p>
        </header>

        {terms.map((item) => (
          <section key={item.title} className={s.section}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
