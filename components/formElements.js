"use client";
import { useEffect, useState, useRef } from "react";
import s from "./formElements.module.scss";
import { Controller } from "react-hook-form";
import { GoCalendar, GoEye, GoEyeClosed } from "react-icons/go";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FaTimes, FaUpload, FaSortDown } from "react-icons/fa";
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
                style={rest.type === "color" ? { background: value } : {}}
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

export const Combobox = ({
  control,
  formOptions,
  label,
  name,
  placeholder,
  options,
  multiple,
  className,
  disabled,
  onChange: compOnChange,
  item,
  renderValue,
}) => {
  const container = useRef();
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({});
  const [hover, setHover] = useState();
  useEffect(() => {
    const { width, height, x, y } = container.current.getBoundingClientRect();
    setStyle({
      position: "absolute",
      left: x,
      top: Math.max(
        Math.min(
          y + height,
          window.innerHeight - Math.min(35 * (options?.length || 0) + 8, 320)
        ),
        8
      ),
      width: width,
      maxHeight: Math.min(window.innerHeight - 16, 300),
    });
  }, [open, options]);
  return (
    <Controller
      control={control}
      name={name}
      rules={formOptions}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        const selected = ![undefined, null].includes(value)
          ? value
          : multiple
          ? []
          : "";
        const select = ({ label, value, ...rest }) => {
          if (disabled) {
            return;
          }
          const _selectedItem = selected?.find?.((item) => item === value);
          if (_selectedItem !== undefined) {
            onChange(selected.filter((item) => item !== value));
          } else {
            if (multiple) {
              onChange([
                ...(selected.filter?.((item) => item !== value) || []),
                value,
              ]);
            } else {
              onChange(value);
            }
          }

          if (!multiple) {
            setOpen(false);
          }
          // clearErrors?.(name);
          compOnChange && compOnChange({ label, value, ...rest });
        };
        return (
          <section
            data-testid="combobox-container"
            className={`${s.combobox} ${className || ""} ${
              open ? s.open : ""
            } ${
              !(Array.isArray(options) && options.length) ? s.noOptions : ""
            } ${error ? s.err : ""} ${disabled ? s.disabled : ""}`}
          >
            {label && (
              <label data-testid="combobox-label">
                {label} {formOptions?.required && "*"}
              </label>
            )}

            <div
              className={s.field}
              onClick={() => {
                if (Array.isArray(options) && options.length) {
                  setOpen(true);
                }
              }}
              ref={container}
              tabIndex={disabled ? 1 : 0}
              onKeyDown={(e) => {
                if (disabled) {
                  return;
                }
                if ([32, 38, 40].includes(e.keyCode)) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.keyCode === 27) {
                    // escape key
                    setOpen(false);
                    return;
                  }
                  if (!open && e.keyCode === 32) {
                    setOpen(true);
                    return;
                  }
                  if (e.keyCode === 32 && options[hover]) {
                    select(options[hover]);
                  }
                  if (e.keyCode === 38 || e.keyCode === 40) {
                    const index =
                      options?.findIndex(({ label, value }) => {
                        return (
                          value === selected ||
                          (selected?.some && selected.some((s) => s === value))
                        );
                      }) || 0;
                    const _hover = hover !== undefined ? hover : index;

                    let newIndex =
                      e.keyCode === 38
                        ? Math.max(_hover - 1, 0)
                        : Math.min(
                            _hover === null ? 0 : _hover + 1,
                            options.length - 1
                          );

                    while (options[newIndex]?.disabled) {
                      if (e.keyCode === 38 && options[newIndex + 1]) {
                        newIndex = Math.max(newIndex - 1, 0);
                      } else if (e.keyCode === 40 && options[newIndex + 1]) {
                        newIndex = Math.min(newIndex + 1, options.length - 1);
                      } else {
                        newIndex = hover;
                      }
                    }

                    setHover(newIndex);
                  }
                }
              }}
            >
              <p
                className={`${s.displayValue} ${
                  (multiple && selected?.length === 0) ||
                  selected === undefined ||
                  selected === ""
                    ? s.placeholder
                    : ""
                }`}
              >
                {renderValue ? (
                  renderValue(selected)
                ) : (
                  <>
                    {!(Array.isArray(options) && options.length) &&
                      "No options provided"}
                    {selected !== undefined &&
                      ["string", "number", "boolean"].includes(
                        typeof selected
                      ) &&
                      options?.find(
                        ({ value }) => value.toString() === selected.toString()
                      )?.label}
                    {Array.isArray(selected) &&
                      (selected.length > 3
                        ? `${selected.length} items selected`
                        : selected.reduce(
                            (p, a, i, arr) =>
                              `${p} ${
                                options?.find(
                                  ({ value }) =>
                                    value.toString() === a.toString()
                                )?.label
                              }${i < arr.length - 1 ? ", " : ""}`,
                            ""
                          ))}
                    {options?.length > 0 &&
                      ((multiple && selected?.length === 0) ||
                        selected === undefined ||
                        selected === "") &&
                      (placeholder || "Select")}
                  </>
                )}
              </p>
              <input
                data-testid="combobox-input"
                ref={ref}
                readOnly={true}
                tabIndex={1}
              />
              <span data-testid="combobox-btn" className={s.btn}>
                <FaSortDown />
              </span>
            </div>
            {error && <span className={s.errMsg}>{error.message}</span>}
            <Modal
              open={open}
              className={s.comboboxModal}
              backdropClass={s.comboboxBackdrop}
              setOpen={setOpen}
              onBackdropClick={() => setOpen(false)}
              // clickThroughBackdrop
              style={style}
            >
              <ComboboxList
                hover={hover}
                setHover={setHover}
                options={options}
                select={select}
                selected={selected}
                multiple={multiple}
                item={item}
              />
            </Modal>
          </section>
        );
      }}
    />
  );
};
const ComboboxList = ({
  options,
  hover,
  setHover,
  select,
  selected,
  multiple,
  item,
}) => {
  return (
    <ul
      className={s.options}
      data-testid="combobox-options"
      onMouseOut={() => setHover(null)}
    >
      {options?.map(({ label, value, disabled, ...rest }, i) => (
        <li
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
              select({ label, value, ...rest });
            }
          }}
          className={`${
            (selected?.find && selected.find((item) => item === value)) ||
            value === selected
              ? s.selected
              : ""
          } ${hover === i && s.hover} ${disabled ? s.disabled : ""}`}
          data-testid={`combobox-${label}`}
          onMouseMove={() => setHover(i)}
          onMouseOut={() => setHover(i)}
        >
          {multiple && (
            <input
              type="checkbox"
              checked={
                (selected?.find && selected.find((item) => item === value)) ||
                false
              }
              readOnly={true}
            />
          )}
          {item ? item({ label, value, ...rest }) : label}
        </li>
      ))}
    </ul>
  );
};
