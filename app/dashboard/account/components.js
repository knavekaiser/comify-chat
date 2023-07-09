import { Input, PasswordInput } from "@/components/formElements";
import { useForm } from "react-hook-form";
import s from "./page.module.scss";
import { useEffect } from "react";
import { useFetch, useYup } from "@/utils/hooks";
import { Prompt } from "@/components/modal";

export const DynamicForm = ({
  currentValues,
  schema,
  fields,
  submit,
  onSuccss,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    ...(schema && { resolver: useYup(schema) }),
  });
  useEffect(() => {
    reset({ ...currentValues });
  }, [currentValues]);
  const { post, put, loading } = useFetch(submit.url);
  return (
    <form
      className={s.dynamicForm}
      onSubmit={handleSubmit((values) => {
        let action = null;
        if (submit.method === "put") {
          action = put;
        } else if (submit.method === "post") {
          action = post;
        }
        action(values)
          .then(({ data }) => {
            if (data.success) {
              return onSuccss(data.data);
            }
            if (data.error?.type === "cred_error") {
              return setError("oldPassword", {
                type: "oldPassword",
                message: data.message,
              });
            } else if (data.error?.type === "field_validation") {
              if (data.error.field === "body.email") {
                return setError("email", {
                  type: "unique",
                  message: data.message,
                });
              }
            }
            Prompt({ type: "error", message: data.message });
          })
          .catch((err) => Prompt({ type: "error", message: err.message }));
      })}
    >
      {fields.map((field) => {
        if (field.inputType === "input") {
          return (
            <Input
              key={field.name}
              control={control}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
            />
          );
        }
        if (field.inputType === "passwordInput") {
          return (
            <PasswordInput
              key={field.name}
              control={control}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              // autoComplete="new-password"
            />
          );
        }
        return null;
      })}
      <section className="actions">
        <button className="btn primary">Submit</button>
      </section>
    </form>
  );
};
