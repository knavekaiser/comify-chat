"use client";
import { Input } from "@/components/formElements";
import s from "./page.module.scss";
import { Space_Grotesk } from "next/font/google";
import { useForm } from "react-hook-form";
import paths from "@/utils/paths";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useFetch, useYup } from "@/utils/hooks";
import * as yup from "yup";
import endpoints from "@/utils/endpoints";
import { Prompt } from "@/components/modal";
import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Field is required"),
});

export const metadata = {
  title: "Infin AI | Forgot Password",
  description:
    "Retrieve access to your Infin AI account in a few simple steps. Submit your email and receive a secure password reset link instantly.",
};

export default function Login() {
  const { handleSubmit, control, setError } = useForm({
    resolver: useYup(validationSchema),
  });
  const [success, setSuccess] = useState(false);
  const { post: sendLink, loading } = useFetch(endpoints.forgotPassword);
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <form
          onSubmit={handleSubmit((values) => {
            sendLink(values)
              .then(({ data }) => {
                if (data.success) {
                  return setSuccess(true);
                }
                if (data.error?.type === "otp_cooldown") {
                  return setError("email", {
                    type: "account",
                    message: data.message,
                  });
                } else if (data.error?.type === "field_validation") {
                  if (data.error.field === "body.email") {
                    return setError("email", {
                      type: "account",
                      message: data.message,
                    });
                  }
                }
                Prompt({
                  type: "error",
                  message: data.message,
                });
              })
              .catch((err) =>
                Prompt({
                  type: "error",
                  message: err.message,
                })
              );
          })}
        >
          <section className={s.head}>
            <p>Forgot Password?</p>
            <h1 className={space_grotesk.className}>
              Generate Password reset link
            </h1>
          </section>

          {success ? (
            <>
              <section className={s.successMessage}>
                <MdMarkEmailRead className={s.icon} />
                <p>
                  Password reset link sent to your email. Please check your
                  inbox, including the spam folder.
                </p>
              </section>

              <section className={s.signupLink}>
                <Link href={paths.login}>
                  <BsArrowLeft /> Back to Login
                </Link>
              </section>
            </>
          ) : (
            <>
              <Input control={control} name="email" placeholder="Email" />

              <section>
                <button className="btn primary large" disabled={loading}>
                  Submit
                </button>
              </section>
              <section className={s.signupLink}>
                <Link href={paths.login}>
                  <BsArrowLeft /> Back to Login
                </Link>
              </section>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
