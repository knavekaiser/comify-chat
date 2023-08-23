"use client";

import endpoints from "@/utils/endpoints";
import { useFetch, useYup } from "@/utils/hooks";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import s from "./page.module.scss";
import Menu from "@/components/menu";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "@/components/table";
import {
  Select,
  Combobox,
  FileInput,
  Input,
  Textarea,
} from "@/components/formElements";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { Prompt } from "@/components/modal";

const docSchema = yup.object({
  topic: yup
    .string()
    .max(75, "Must be under 75 characters")
    .required("Field is required"),
  parentTopic: yup.string().nullable(),
  description: yup.string().max(200, "Must be under 200 characters"),
  contextForUsers: yup.string().max(200, "Must be under 200 characters"),
  files: yup.array().of(yup.mixed()),
  urls: yup.array().of(yup.string().url()),
  content: yup.string().when(["files", "urls"], ([files, urls], schema) => {
    if (!files?.length && !urls.length) {
      return schema.required("Please enter context or provide files or urls");
    }
    return schema;
  }),
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
    setFocus,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: useYup(docSchema),
  });
  const formRef = useRef();

  const { post, put, loading } = useFetch(
    endpoints.topics + `/${edit?._id || ""}`
  );
  const { post: getUserContext, loading: generatingQuestion } = useFetch(
    endpoints.generateUserContext
  );

  const prompt = watch("prompt");

  const generateQuestion = useCallback(() => {
    if (!prompt) {
      return setError("prompt", {
        type: "manual",
        message: "Field is required",
      });
    }
    getUserContext({ prompt }, { params: { "{_id}": edit._id } })
      .then(({ data }) => {
        if (!data.success) {
          return Prompt({ type: "error", message: data.message });
        }
        setValue("contextForUsers", data.data.contextForUsers);
        setValue("prompt", "");
      })
      .catch((err) => Prompt({ type: "error", message: err.message }));
  }, [prompt]);

  const urls = watch("urls");
  const url = watch("url");
  const showOnChat = watch("showOnChat");

  useEffect(() => {
    reset({
      ...edit,
      urls: edit?.urls || [],
      paths: edit?.paths?.length ? edit.paths.join(", ") : "",
      showOnChat: edit && "showOnChat" in edit ? edit.showOnChat : false,
    });
  }, [edit]);

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return !!errors[field] ? field : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);
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
          if (key === "paths") {
            value = value.split(", ").filter(Boolean);
            if (!value.length) {
              formData.append(key, null);
              return;
            }
          }
          if (key === "parentTopic" && !value) {
            value = null;
          }
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
          if (key === "content") {
            value = value || null;
          }

          if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
          } else if (value || value === false || value === null) {
            formData.append(key, value);
          }
        });

        (edit ? put : post)(formData)
          .then(({ data }) => {
            if (!data.success) {
              if (data.error?.type === "field_validation") {
                if (data.error.field === "body.topic") {
                  return setError("topic", {
                    type: "unique",
                    message: data.message,
                  });
                }
              }
              return Prompt({ type: "error", message: data.message });
            }
            onSuccess(data.data);
          })
          .catch((err) => Prompt({ type: "error", message: err.message }));
      })}
    >
      <Input className={s.topic} control={control} label="Topic" name="topic" />

      <Combobox
        className={s.showOnChat}
        control={control}
        name="showOnChat"
        label="Show on Chat"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
      />
      {showOnChat && (
        <>
          <Input
            className={s.paths}
            label="Paths (select where this topic appears)"
            control={control}
            placeholder="/some-path"
            name="paths"
            hint={`List multiple paths with ", " (comma and space). By default, it will be displayed on all pages.`}
          />
        </>
      )}

      <Select
        className={s.parentTopic}
        label="Parent Topic"
        control={control}
        name="parentTopic"
        url={endpoints.topics}
        getQuery={(v) => ({ topic: v })}
        handleData={(topic) => ({
          label: topic.topic,
          value: topic._id,
        })}
      />

      <Textarea
        className={s.content}
        control={control}
        label="Content"
        name="content"
      />

      <FileInput
        className={s.fileInput}
        label="File"
        multiple
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
            placeholder="https://example.com"
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
              <td className="ellepsis">{item}</td>
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

      {edit && (
        <>
          <div className={s.questionGeneration}>
            <Textarea
              label="Your Question to Infin AI"
              control={control}
              name="prompt"
              onChange={() => {
                clearErrors("prompt");
              }}
              onKeyPress={(e) => {
                if (e.charCode === 13) {
                  e.preventDefault();
                  generateQuestion();
                }
              }}
            />
            <button
              className={`btn secondary medium ${s.btn} ${
                loading || generatingQuestion ? "loading" : ""
              }`}
              type="button"
              disabled={loading || generatingQuestion}
              onClick={generateQuestion}
            >
              Generate Questions
            </button>
          </div>

          <Textarea
            className={s.contextForUsers}
            label="Topic Context for Users"
            control={control}
            name="contextForUsers"
          />
        </>
      )}

      <Textarea
        className={s.contextForUsers}
        label="Description"
        control={control}
        name="description"
      />
      <section className={`${s.actions} actions`}>
        <button
          className={`btn primary ${
            loading || generatingQuestion ? "loading" : ""
          }`}
          disabled={loading || generatingQuestion}
        >
          Submit
        </button>
      </section>
    </form>
  );
}
