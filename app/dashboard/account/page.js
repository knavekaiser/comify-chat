"use client";

import { useContext, useState } from "react";
import pageStyle from "../page.module.scss";
import s from "./page.module.scss";
import { SiteContext } from "@/app/context";
import { Modal, Prompt } from "@/components/modal";
import { DynamicForm } from "./components";
import * as yup from "yup";
import endpoints from "@/utils/endpoints";

export default function Home() {
  const { user, setUser } = useContext(SiteContext);
  const [form, setForm] = useState(null);
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1>Account</h1>
        <p className={s.description}>
          Personalize your Infin AI experience and manage your account settings
          with ease.
        </p>
      </header>

      <section className={s.email}>
        <div className={s.content}>
          <h3>Email Address</h3>
          <p className="ellepsis line-2">{user?.email}</p>
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Account Email",
                fields: [
                  {
                    inputType: "input",
                    type: "email",
                    name: "email",
                    placeholder: "Email",
                  },
                ],
                currentValues: { email: user?.email || "" },
                schema: yup.object({
                  email: yup
                    .string()
                    .email("Please enter a valid email")
                    .required("Field is required"),
                }),
                submit: {
                  url: endpoints.profile,
                  method: "put",
                },
                onSuccess: (newProfile) => {
                  setForm(null);
                  setUser((prev) => ({ ...prev, email: newProfile.email }));
                  Prompt({
                    type: "success",
                    message: "Email updated successfully",
                  });
                },
              })
            }
          >
            Change email
          </button>
        </div>
      </section>

      <section className={s.password}>
        <div className={s.content}>
          <h3>Password</h3>
          <p>********</p>
        </div>
        <div className={s.action}>
          <button
            className="btn primary"
            onClick={() =>
              setForm({
                title: "Update Password",
                fields: [
                  {
                    label: "Current Password",
                    inputType: "passwordInput",
                    name: "oldPassword",
                    placeholder: "Current Password",
                    type: "password",
                  },
                  {
                    label: "New Password",
                    inputType: "passwordInput",
                    name: "password",
                    placeholder: "New Password",
                    type: "password",
                  },
                ],
                currentValues: {},
                schema: yup.object({
                  oldPassword: yup.string().required("Field is required"),
                  password: yup
                    .string()
                    .min(8, "Password must be 8 characters or longer")
                    .required("Field is required"),
                }),
                submit: {
                  url: endpoints.profile,
                  method: "put",
                },
                onSuccess: () => {
                  setForm(null);
                  Prompt({
                    type: "success",
                    message: "Password updated successfully",
                  });
                },
              })
            }
          >
            Change password
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
