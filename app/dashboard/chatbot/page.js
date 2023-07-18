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

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });



export default function Home() {
  const { user, setUser } = useContext(SiteContext);
  const [form, setForm] = useState(null);
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1 className={space_grotesk.className}>Chatbot</h1>
        <p className={s.description}>
          Tailor your chatbot's look to match your site and brand seamlessly.
        </p>
      </header>

      <section className={s.section}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Domain</h3>
          <p className="ellepsis line-2">
            {user?.chatbot?.domain ||
              "The website domain where the chatbot will be deployed"}
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
                  url: endpoints.chatbots + `/${user.chatbot._id}`,
                  method: "put",
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
                  url: endpoints.chatbots + `/${user.chatbot._id}`,
                  method: "put",
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

      <section className={s.section}>
        <div className={s.content}>
          <h3 className={space_grotesk.className}>Show Topics</h3>
          <p className="ellepsis line-2">
            {user?.chatbot?.showTopic ? "Yes" : "No"}
          </p>
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Show Topics",
                fields: [
                  {
                    inputType: "select",
                    name: "showTopic",
                    options: [
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ],
                  },
                ],
                currentValues: { showTopic: user?.chatbot?.showTopic || false },
                schema: yup.object({
                  showTopic: yup.boolean().required("Field is required"),
                }),
                submit: {
                  url: endpoints.chatbots + `/${user.chatbot._id}`,
                  method: "put",
                },
                onSuccess: (newChatbot) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, chatbot: newChatbot }));
                  Prompt({
                    type: "success",
                    message: "Settings updated successfully",
                  });
                },
              })
            }
          >
            Update
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
    </main>
  );
}
