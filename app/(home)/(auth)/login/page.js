"use client";
import { Input } from "@/components/formElements";
import s from "./page.module.scss";
import { Space_Grotesk } from "next/font/google";
import { useForm } from "react-hook-form";
import paths from "@/utils/paths";
import Link from "next/link";
import { useContext, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useFetch, useYup } from "@/utils/hooks";
import * as yup from "yup";
import endpoints from "@/utils/endpoints";
import { Prompt } from "@/components/modal";
import { SiteContext } from "@/app/context";
import { useRouter } from "next/navigation";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Field is required"),
  password: yup
    .string()
    // .min(8, "Password must be 8 characters or longer")
    .required("Field is required"),
});

export default function Login() {
  const { user, setUser } = useContext(SiteContext);
  const [err, setErr] = useState(false);
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: useYup(validationSchema),
  });
  const [pType, setPType] = useState("password");
  const { post, loading } = useFetch(endpoints.login);
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <form
          onSubmit={handleSubmit((values) => {
            post(values)
              .then(({ data }) => {
                if (data.success) {
                  setUser(data.data);
                  localStorage.setItem("access_token", data.token);
                  const destinaiton = sessionStorage.getItem(
                    "destination_after_login"
                  );
                  if (destinaiton) {
                    sessionStorage.removeItem("destination_after_login");
                    return router.replace(destinaiton);
                  }
                  return router.replace(paths.topics);
                } else if (data.error.type === "cred_error") {
                  setErr(data.message);
                } else {
                  Prompt({
                    type: "error",
                    message: data.message,
                  });
                }
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
            <p>Welcome Back</p>
            <h1 className={space_grotesk.className}>Login to continue</h1>
          </section>
          {err && <p className={s.errMsg}>{err}</p>}
          <Input
            control={control}
            name="email"
            placeholder="Email"
            onChange={setErr}
          />
          <Input
            control={control}
            type={pType}
            name="password"
            placeholder="Password"
            onChange={setErr}
            endAdornment={
              <button
                className={s.eye}
                type="button"
                onClick={() => setPType(pType === "text" ? "password" : "text")}
                title={pType === "password" ? "Show password" : "Hide password"}
              >
                {pType === "password" ? <GoEye /> : <GoEyeClosed />}
              </button>
            }
          />
          <section className={s.forgotPassword}>
            <Link href={paths.forgotPassword}>Forgot password?</Link>
          </section>
          <section>
            <button className="btn primary large" disabled={loading || user}>
              Sign In
            </button>
          </section>
          <section className={s.signupLink}>
            <p>
              Don&apos;t have an account?{" "}
              <Link href={paths.register}>Sign Up for Free</Link>
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}
