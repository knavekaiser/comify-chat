import { Input, Combobox } from "@/components/formElements";
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
  const { handleSubmit, control, reset } = useForm({
    resolver: useYup(schema || {}),
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
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
            />
          );
        }
        if (field.inputType === "select") {
          return (
            <Combobox
              key={field.name}
              control={control}
              name={field.name}
              label={field.label}
              options={field.options}
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
