"use client";
import { useEffect, useState } from "react";
import s from "./formElements.module.scss";
import { Controller } from "react-hook-form";
import { GoCalendar, GoEye, GoEyeClosed } from "react-icons/go";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FaTimes, FaUpload } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Modal, Prompt } from "./modal";
import { Table } from "./table";
import { BiSolidDownArrow } from "react-icons/bi";
import Menu from "./menu";

export const Input = ({
  control,
  name,
  label,
  className,
  required,
  startAdornment,
  endAdornment,
  onChange: customOnChange,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => {
        return (
          <section
            className={`${s.input} ${className || ""} ${error ? s.err : ""}`}
          >
            {label && (
              <label>
                {label} {required && "*"}
              </label>
            )}
            <div className={s.wrapper}>
              <span
                className={`${s.field} ${
                  startAdornment ? s.start_adornment : ""
                } ${endAdornment ? s.end_adornment : ""}`}
              >
                <span className={startAdornment ? s.startAdornment : ""}>
                  {startAdornment}
                </span>
                <input
                  type={rest.type || "text"}
                  id={name}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    customOnChange?.();
                  }}
                  placeholder={rest.placeholder || "Enter"}
                  {...rest}
                />
                {["date", "datetime-local"].includes(rest.type) && (
                  <label htmlFor={id} className={s.calenderIcon}>
                    <GoCalendar />
                  </label>
                )}
                <span className={endAdornment ? s.endAdornment : ""}>
                  {endAdornment}
                </span>
              </span>
              {error && <span className={s.errMsg}>{error.message}</span>}
            </div>
          </section>
        );
      }}
    />
  );
};

export const PasswordInput = ({
  label,
  control,
  name,
  placeholder,
  autoComplete,
}) => {
  const [type, setType] = useState("password");
  return (
    <Input
      control={control}
      type={type}
      name={name}
      label={label}
      placeholder={placeholder || "Password"}
      autoComplete={autoComplete || "new-password"}
      endAdornment={
        <button
          className={s.eye}
          type="button"
          onClick={() => setType(type === "text" ? "password" : "text")}
          title={type === "password" ? "Show password" : "Hide password"}
        >
          {type === "password" ? <GoEye /> : <GoEyeClosed />}
        </button>
      }
    />
  );
};

export const Textarea = ({
  control,
  name,
  label,
  className,
  required,
  startAdornment,
  endAdornment,
  onChange: customOnChange,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => {
        return (
          <section
            className={`${s.input} ${s.textarea} ${className || ""} ${
              error ? s.err : ""
            }`}
          >
            {label && (
              <label>
                {label} {required && "*"}
              </label>
            )}
            <div className={s.wrapper}>
              <span className={s.field}>
                <textarea value={value} onChange={onChange} {...rest} />
                {error && (
                  <span
                    className={s.errIcon}
                    style={!label ? { transform: "translateY(-6px)" } : {}}
                  >
                    <BsFillExclamationTriangleFill />
                  </span>
                )}
                {error && <span className={s.errMsg}>{error.message}</span>}
              </span>
            </div>
          </section>
        );
      }}
    />
  );
};

export const FileInput = ({
  label,
  control,
  name,
  thumbnail,
  formOptions,
  multiple,
  accept,
}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  useEffect(() => {
    if (control._formValues[name]?.length !== files.length) {
      setFiles(
        control._formValues[name]?.map((file) =>
          typeof file === "string" ? { name: file, uploadFilePath: file } : file
        ) || []
      );
    }
  }, [control._formValues[name]?.length]);
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value = multiple ? [] : "", name },
        fieldState: { error },
      }) => (
        <section
          data-testid="fileInput"
          className={`${s.fileInput} ${error ? s.error : ""}`}
        >
          <div className={s.label}>
            <label>
              {label} {formOptions?.required && "*"}
            </label>
            {!thumbnail && (
              <span className={s.fileCount} onClick={() => setShowFiles(true)}>
                {files.length} files selected
              </span>
            )}
          </div>
          <input
            disabled={loading}
            id={name}
            style={{ display: "none" }}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={async (e) => {
              if (e.target.files.length > 0) {
                let _files;
                if (multiple) {
                  _files = [
                    ...files,
                    ...[...e.target.files].filter(
                      (item) =>
                        !files.some(
                          (file) =>
                            (file.name || file.fileName) ===
                            (item.name || item.fileName)
                        )
                    ),
                  ];
                } else {
                  _files = [e.target.files[0]];
                }
                for (let i = 0; i < _files.length; i++) {
                  const item = _files[i];
                  if (item.type?.startsWith("image/")) {
                    setLoading(true);
                    _files[i] = await resizeImg(item);
                    setLoading(false);
                  }
                }
                setFiles(_files);
                onChange(_files);
              }
            }}
          />
          {thumbnail ? (
            <ul className={s.files}>
              {files.map((file, i) => {
                const ClearBtn = () => (
                  <button
                    className={`clear ${s.clear}`}
                    type="button"
                    onClick={() => {
                      let _files = files.filter((f) =>
                        typeof f === "string"
                          ? f !== file
                          : (f.name || f.fileName) !==
                            (file.name || file.fileName)
                      );
                      setFiles(_files);
                      onChange(_files);
                    }}
                  >
                    <FaTimes />
                  </button>
                );

                if (
                  !file.size &&
                  new RegExp(/\.(jpg|jpeg|png|gif|webp|ico)$/).test(file.name)
                ) {
                  return (
                    <li className={s.file} key={i}>
                      <ClearBtn />
                      <img src={file.name} />
                    </li>
                  );
                }

                if (
                  new RegExp(/\.(jpg|jpeg|png|gif|webp|ico)$/).test(file?.name)
                ) {
                  const url = URL.createObjectURL(file);
                  return (
                    <li className={s.file} key={i}>
                      <ClearBtn />
                      <img src={url} />
                    </li>
                  );
                }
                return (
                  <li className={s.file} key={i}>
                    <ClearBtn />
                    {file.name || "__file--"}
                  </li>
                );
              })}
              {(multiple || (!multiple && !files.length)) && (
                <li className={s.fileInputUploadBtn}>
                  <label htmlFor={name}>
                    {loading ? (
                      <CgSpinner className={s.spinner} />
                    ) : (
                      <FaUpload />
                    )}
                  </label>
                </li>
              )}
            </ul>
          ) : (
            <div className={s.inputField}>
              <label htmlFor={name}>
                <span className={s.fileNames}>
                  {files.reduce((p, a) => {
                    return p + (a.name || a.fileName) + ", ";
                  }, "") || "Item select"}
                </span>
                <span className={s.btn}>
                  {loading ? <CgSpinner className={s.spinner} /> : <FaUpload />}
                </span>
              </label>
            </div>
          )}
          {!thumbnail && (
            <Modal
              open={showFiles}
              className={s.fileInputModal}
              setOpen={setShowFiles}
              title="Files"
            >
              <div className={s.container}>
                <Table columns={[{ label: "File" }, { label: "Action" }]}>
                  {files.map((file, i) => (
                    <tr key={i}>
                      <td>
                        <a target="_blank" href={file.uploadFilePath}>
                          {file.name || file.fileName || file.uploadFilePath}
                        </a>
                      </td>
                      <td className="tableActions">
                        <Menu
                          button={
                            <button type="button" className="btn clear small">
                              <BiSolidDownArrow />
                            </button>
                          }
                          options={[
                            {
                              label: "Remove",
                              onClick: () =>
                                Prompt({
                                  type: "confirmation",
                                  message: `Are you sure you want to remove this File?`,
                                  callback: () => {
                                    let _files = files.filter((f) =>
                                      typeof f === "string"
                                        ? f !== file
                                        : (f.name || f.fileName) !==
                                          (file.name || file.fileName)
                                    );
                                    setFiles(_files);
                                    onChange(_files);
                                  },
                                }),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </Modal>
          )}
          {error && <span className={s.errMsg}>{error.message}</span>}
        </section>
      )}
    />
  );
};
