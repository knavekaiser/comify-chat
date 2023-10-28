"use client";
import { Input } from "@/components/formElements";
import s from "./page.module.scss";
import { useForm } from "react-hook-form";
import paths from "@/utils/paths";
import Link from "next/link";
import { useFetch, useYup } from "@/utils/hooks";
import * as yup from "yup";
import { useContext, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import endpoints from "@/utils/endpoints";
import { Prompt } from "@/components/modal";
import { SiteContext } from "@/app/context";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  name: yup.string().required("Field is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Field is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters or longer")
    .required("Field is Required"),
});

export default function Register() {
  const { user, setUser } = useContext(SiteContext);
  const router = useRouter();
  const { handleSubmit, setError, control } = useForm({
    resolver: useYup(validationSchema),
  });
  const [pType, setPType] = useState("password");
  const { post, loading } = useFetch(endpoints.register);
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <form
          autoComplete="off"
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
                }
                if (data.error?.type === "field_validation") {
                  if (data.error.field === "body.email") {
                    return setError("email", {
                      type: "unique",
                      message: data.message,
                    });
                  }
                }
                Prompt({
                  type: "error",
                  message: data.message,
                });
                // handle error
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
            <p>Welcome to Infin AI</p>
            <h1>Register to get started</h1>
          </section>
          <Input control={control} name="name" placeholder="Name" />
          <Input control={control} name="email" placeholder="Email" />
          <Input
            control={control}
            type={pType}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
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
          <section className={s.policyAggrement}>
            <p>
              By clicking Sign Up, you agree to our{" "}
              <Link href={paths.tnc} target="_blank">
                Terms
              </Link>
              ,<br />
              <Link href={paths.privacyPolicy} target="_blank">
                Privacy Policy
              </Link>
            </p>
          </section>
          <section>
            <button
              className={`btn primary large  ${loading ? "loading" : ""}`}
              disabled={loading || user}
            >
              Sign Up
            </button>
          </section>
          <section className={s.signupLink}>
            <p>
              Already have an account? <Link href={paths.login}>Sign In</Link>
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}
