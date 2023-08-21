"use client";

import { useContext, useState } from "react";
import pageStyle from "../page.module.scss";
import s from "./page.module.scss";
import { Space_Grotesk } from "next/font/google";
import { SiteContext } from "@/app/context";
import { Modal, Prompt } from "@/components/modal";
import { DynamicForm } from "./components";
import * as yup from "yup";
import endpoints from "@/utils/endpoints";
import paths from "@/utils/paths";
import { BsBoxArrowUpRight } from "react-icons/bs";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export const ChatbotConfig = () => {
  const { user, setUser } = useContext(SiteContext);
  const [form, setForm] = useState(null);
  return (
    <>
      <section className={`${s.section} ${s.domain}`}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Display Name</h3>
          <p className="ellepsis line-2">
            {user?.chatbot?.display_name || "Infin AI"}
          </p>
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Display Name",
                fields: [
                  {
                    inputType: "input",
                    name: "display_name",
                    placeholder: "Display Name",
                  },
                ],
                currentValues: {
                  display_name: user?.chatbot?.display_name || "",
                },
                schema: yup.object({
                  display_name: yup.string(25).required("Field is required"),
                }),
                submit: {
                  url: endpoints.chatbots + `/${user.chatbot?._id || ""}`,
                  method: user.chatbot?._id ? "put" : "post",
                },
                onSuccess: (newChatbot) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, chatbot: newChatbot }));
                  Prompt({
                    type: "success",
                    message: "Display Name updated successfully",
                  });
                },
              })
            }
          >
            Update Name
          </button>
        </div>
      </section>

      <section className={`${s.section} ${s.domain}`}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Domain</h3>
          <p className="ellepsis line-2">
            {user?.chatbot?.domain ? (
              <>
                <span>{user?.chatbot?.domain}</span>
                <a
                  href={paths.dynamicChatbot + "/" + user.chatbot.domain}
                  target="_blank"
                >
                  <BsBoxArrowUpRight />
                </a>
              </>
            ) : (
              "The website domain where the chatbot will be deployed"
            )}
          </p>
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Website Domain",
                fields: [
                  {
                    inputType: "input",
                    name: "domain",
                    placeholder: "Website Domain",
                  },
                ],
                currentValues: { domain: user?.chatbot?.domain || "" },
                schema: yup.object({
                  domain: yup
                    .string()
                    .required("Field is required")
                    .transform((v, original) => {
                      return v.replace(
                        /^(?:https?:\/\/)?(?:www\.)?([^\/?]+)(?:\/[^?]+)?.*/,
                        "$1"
                      );
                    })
                    .test("is-valid-domain", "Invalid domain", (value) => {
                      return /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/.test(
                        value
                      );
                    }),
                }),
                submit: {
                  url: endpoints.chatbots + `/${user.chatbot?._id || ""}`,
                  method: user.chatbot?._id ? "put" : "post",
                },
                onSuccess: (newChatbot) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, chatbot: newChatbot }));
                  Prompt({
                    type: "success",
                    message: "Domain updated successfully",
                  });
                },
              })
            }
          >
            {user?.domain ? "Update Domain" : "Add Domain"}
          </button>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Avatar</h3>
          <img
            className={`${s.avatarPreview} ${
              user.chatbot?.avatar ? s.custom : ""
            }`}
            src={
              endpoints.baseUrl +
              (user.chatbot?.avatar
                ? user.chatbot.avatar
                : `/assets/sdk/infinai-chat-avatar/full.webp`)
            }
          />
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Avatar",
                fields: [
                  {
                    // label: "Avatar",
                    inputType: "fileInput",
                    name: "avatar",
                    imgOptions: { maxDim: 120 },
                  },
                ],
                currentValues: {
                  avatar: user?.chatbot?.avatar || null,
                },
                schema: yup.object({
                  avatar: yup.mixed().nullable(),
                }),
                submit: {
                  url: endpoints.chatbots + `/${user.chatbot?._id || ""}`,
                  method: user.chatbot?._id ? "put" : "post",
                },
                onSuccess: (newChatbot) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, chatbot: newChatbot }));
                  Prompt({
                    type: "success",
                    message: "Chatbot avatar updated successfully",
                  });
                },
              })
            }
          >
            Change Avatar
          </button>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Primary Color</h3>
          <span
            className={s.colorPreview}
            style={{
              background:
                user?.chatbot?.primaryColor || "rgb(var(--primary-color-rgb))",
            }}
          />
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Primary Color",
                fields: [
                  {
                    label: "Primary Color",
                    inputType: "input",
                    type: "color",
                    name: "primaryColor",
                  },
                ],
                currentValues: {
                  primaryColor: user?.chatbot?.primaryColor || "",
                },
                schema: yup.object({
                  primaryColor: yup.string().required("Field is required"),
                }),
                submit: {
                  url: endpoints.chatbots + `/${user.chatbot?._id || ""}`,
                  method: user.chatbot?._id ? "put" : "post",
                },
                onSuccess: (newChatbot) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, chatbot: newChatbot }));
                  Prompt({
                    type: "success",
                    message: "Primary Color updated successfully",
                  });
                },
              })
            }
          >
            Change Color
          </button>
        </div>
      </section>

      <section className={`${s.section} ${s.autoOpen}`}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Auto Open Chatbot</h3>
          <p className="ellepsis line-2">
            {user?.chatbot?.autoOpenAfter
              ? `After ${user.chatbot.autoOpenAfter} seconds`
              : "Never"}
          </p>
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Auto Open Chatbot",
                fields: [
                  {
                    inputType: "select",
                    name: "autoOpenAfter",
                    clearable: true,
                    options: [
                      // { label: "Never", value: "" },
                      { label: "After 5 Seconds", value: "5s" },
                      { label: "After 10 Seconds", value: "10s" },
                    ],
                    placeholder: "Never",
                  },
                ],
                currentValues: {
                  autoOpenAfter: user?.chatbot?.autoOpenAfter || "",
                },
                schema: yup.object({
                  autoOpenAfter: yup
                    .string()
                    .nullable()
                    .oneOf(["5s", "10s", "", null]),
                }),
                submit: {
                  url: endpoints.chatbots + `/${user.chatbot?._id || ""}`,
                  method: user.chatbot?._id ? "put" : "post",
                },
                onSuccess: (newChatbot) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, chatbot: newChatbot }));
                  Prompt({
                    type: "success",
                    message: "Domain updated successfully",
                  });
                },
              })
            }
          >
            Change Setting
          </button>
        </div>
      </section>

      <Modal
        className={s.dynamicFormModal}
        open={form}
        setOpen={setForm}
        title={form?.title}
      >
        <DynamicForm
          fields={form?.fields}
          submit={form?.submit}
          onSuccess={() => {
            //
          }}
          currentValues={form?.currentValues}
          schema={form?.schema}
          onSuccss={form?.onSuccess}
        />
      </Modal>
    </>
  );
};

export default function Home() {
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1 className={space_grotesk.className}>Chatbot</h1>
        <p className={s.description}>
          Tailor your chatbot&apos;s look to match your site and brand
          seamlessly.
        </p>
      </header>

      <ChatbotConfig />
    </main>
  );
}
