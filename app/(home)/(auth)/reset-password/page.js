"use client";
import { PasswordInput } from "@/components/formElements";
import s from "./page.module.scss";
import { useForm } from "react-hook-form";
import paths from "@/utils/paths";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useFetch, useYup } from "@/utils/hooks";
import * as yup from "yup";
import endpoints from "@/utils/endpoints";
import { Prompt } from "@/components/modal";
import { useEffect, useState } from "react";
import { MdPassword, MdOutlineVpnKeyOff } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be 8 characters or longer")
    .required("Field is required"),
});

export default function Login() {
  const { handleSubmit, control, setError } = useForm({
    resolver: useYup(validationSchema),
  });
  const [tokenStatus, setTokenStatus] = useState(null);
  const [validating, setValidating] = useState(true);
  const [success, setSuccess] = useState(false);
  const { post: validateTK } = useFetch(endpoints.validatePassToken);
  const { post: sendLink, loading } = useFetch(endpoints.resetPassword);
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setTokenStatus("invalid");
      setValidating(false);
      return;
    }
    validateTK({ token })
      .then(({ data }) => {
        setValidating(false);
        if (data.success) {
          return setTokenStatus("valid");
        }
        setTokenStatus("invalid");
      })
      .catch((err) => Prompt({ type: "error", message: err.message }));
  }, []);
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <form
          onSubmit={handleSubmit((values) => {
            sendLink({ token: searchParams.get("token"), ...values })
              .then(({ data }) => {
                if (data.success) {
                  return setSuccess(true);
                }
                if (data.error?.type === "otp_expired") {
                  return setTokenStatus("invalid");
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
            <p>Reset Password</p>
            <h1>Create a new Password</h1>
          </section>

          {validating && (
            <section className={s.loading}>
              <CgSpinner className={s.icon} />
            </section>
          )}

          {tokenStatus === "invalid" && (
            <>
              <section className={s.invalidTk}>
                <MdOutlineVpnKeyOff className={s.icon} />
                <p>
                  The password reset link provided is not valid or has expired.
                  Please initiate the password reset process again.
                </p>
              </section>
              <section className={s.signupLink}>
                <Link href={paths.forgotPassword}>
                  <BsArrowLeft /> Send Password reset email
                </Link>
              </section>
            </>
          )}

          {!success && tokenStatus === "valid" && (
            <>
              <PasswordInput
                control={control}
                name="password"
                placeholder="New Password"
              />

              <section>
                <button
                  disabled={loading}
                  className={`btn primary large  ${loading ? "loading" : ""}`}
                >
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

          {success && (
            <>
              <section className={s.successMessage}>
                <MdPassword className={s.icon} />
                <p>Your password has been reset. Please Log in.</p>
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
