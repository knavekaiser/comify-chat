"use client";

import endpoints from "@/utils/endpoints";
import Script from "next/script";
import s from "./style.module.scss";

const getChatbot = async (domain) => {
  const res = await fetch(endpoints.chatbotByDomain + `/${domain}`, {
    method: "GET",
  });
  return res.json();
};

const Page = async ({ params }) => {
  const chatbotConfig = await getChatbot(params.domain);

  if (chatbotConfig?.success) {
    return (
      <>
        <div id="chatContainer" className={s.chatContainer} />
        <Script
          src={endpoints.infinAIChatSdk}
          strategy="lazyOnload"
          onLoad={() => {
            const { default: mountInfinAI } = InfinAI;
            mountInfinAI({
              containerId: "chatContainer",
              baseUrl: endpoints.baseUrl,
              standalone: true,
              chatbotId: chatbotConfig.data._id,
            });
          }}
        />
      </>
    );
  }

  return <div>Chatbot does not exist</div>;
};

export default Page;
