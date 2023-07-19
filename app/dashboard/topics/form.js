"use client";

import endpoints from "@/utils/endpoints";
import { useFetch, useYup } from "@/utils/hooks";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import s from "./page.module.scss";
import Menu from "@/components/menu";
import { useEffect, useRef, useState } from "react";
import { Table } from "@/components/table";
import {
  Combobox,
  FileInput,
  Input,
  Textarea,
} from "@/components/formElements";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { Prompt } from "@/components/modal";

const docSchema = yup.object({
  topic: yup.string().required("Field is required"),
  description: yup.string(),
  files: yup.array().of(yup.mixed()),
  urls: yup.array().of(yup.string().url()),
  showOnChat: yup.boolean(),
});

export default function Form({ edit, onSuccess }) {
  const [updateUrl, setUpdateUrl] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    resolver: useYup(docSchema),
  });
  const formRef = useRef();

  const { post, put, loading } = useFetch(
    endpoints.topics + `/${edit?._id || ""}`
  );

  const urls = watch("urls");
  const url = watch("url");

  useEffect(() => {
    reset({
      ...edit,
      urls: edit?.urls || [],
      showOnChat: "showOnChat" in edit ? edit.showOnChat : false,
    });
  }, [edit]);
  return (
    <form
      ref={formRef}
      className={s.form}
      onSubmit={handleSubmit((values) => {
        const payload = {
          ...values,
          files: values.files,
          urls: JSON.stringify(values.urls),
        };
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (key === "files" && value) {
            const oldFiles = value.filter((item) => item.url);
            const newFiles = value.filter((item) => !item.url);

            if (oldFiles.length) {
              formData.append(key, JSON.stringify(oldFiles));
            }
            if (newFiles.length) {
              newFiles.forEach((file) => formData.append(key, file));
            }
            return;
          }
          if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
          } else if (value) {
            formData.append(key, value);
          }
        });

        (edit ? put : post)(formData)
          .then(({ data }) => {
            if (!data.success) {
              return Prompt({ type: "error", message: data.message });
            }
            onSuccess(data.data);
          })
          .catch((err) => Prompt({ type: "error", message: err.message }));
      })}
    >
      <Input control={control} label="Topic" name="topic" />

      <Combobox
        control={control}
        name="showOnChat"
        label="Show on Chat"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
      />

      <FileInput
        label="File"
        accept="text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        control={control}
        name="files"
      />

      <section className={s.urls}>
        <section className={s.urlInput}>
          <Input
            label="URL"
            control={control}
            name="url"
            className={s.urlField}
            onChange={() => {
              clearErrors("url");
            }}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                e.preventDefault();
                if (url) {
                  const _url = url.startsWith("http") ? url : "http://" + url;
                  if (urls.includes(_url)) {
                    return setError("url", {
                      type: "manual",
                      message: "URL already exist",
                    });
                  }
                  setValue("urls", [
                    ...new Set(
                      updateUrl
                        ? urls.map((i) => (i === updateUrl ? _url : i))
                        : [...urls, _url]
                    ),
                  ]);
                  setValue("url", "");
                  setUpdateUrl(null);
                }
              }
            }}
          />
          <button
            className="btn small"
            type="button"
            onClick={() => {
              if (!url) {
                return setError("url", {
                  type: "manual",
                  message: "Field is required",
                });
              }

              const _url = url.startsWith("http") ? url : "http://" + url;
              if (urls.includes(_url)) {
                return setError("url", {
                  type: "manual",
                  message: "URL already exist",
                });
              }
              setValue("urls", [
                ...new Set(
                  updateUrl
                    ? urls.map((i) => (i === updateUrl ? _url : i))
                    : [...urls, _url]
                ),
              ]);
              setValue("url", "");
              setUpdateUrl(null);
            }}
          >
            {updateUrl ? <FaCheck /> : <FaPlus />}
          </button>
          {updateUrl && (
            <button
              className="btn small"
              type="button"
              onClick={() => {
                setValue("url", "");
                setUpdateUrl(null);
              }}
            >
              <FaTimes />
            </button>
          )}
        </section>

        <Table
          className={s.urlTable}
          columns={[{ label: "URL" }, { label: "Action" }]}
        >
          {(urls || []).map((item) => (
            <tr key={item}>
              <td>{item}</td>
              <td className="tableActions">
                <Menu
                  button={
                    <button type="button" className="btn clear small">
                      <BiSolidDownArrow />
                    </button>
                  }
                  options={[
                    {
                      label: "Edit",
                      onClick: () => {
                        setValue("url", item);
                        setUpdateUrl(item);
                      },
                    },
                    {
                      label: "Delete",
                      onClick: () =>
                        Prompt({
                          type: "confirmation",
                          message: `Are you sure you want to remove this URL?`,
                          callback: () => {
                            setValue(
                              "urls",
                              urls.filter((i) => item !== i)
                            );
                          },
                        }),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </Table>
      </section>

      <Textarea label="Description" control={control} name="description" />
      <section className="actions">
        <button className="btn primary" disabled={loading}>
          Submit
        </button>
      </section>
    </form>
  );
}
