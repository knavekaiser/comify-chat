"use client";

import pageStyle from "../page.module.scss";
import s from "./page.module.scss";
import { useForm } from "react-hook-form";
import { Input } from "@/components/formElements";
import { BsSearch } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";
import endpoints from "@/utils/endpoints";
import { Table } from "@/components/table";
import Menu from "@/components/menu";
import { useState } from "react";
import { Modal, Prompt } from "@/components/modal";
import Form from "./form";
import { useFetch } from "@/utils/hooks";

export default function Home() {
  const { control, handleSubmit } = useForm();
  const [filters, setFilters] = useState({});
  const [addNew, setAddNew] = useState(false);
  const { remove: dltTopic, loading } = useFetch(endpoints.topics + "/{_id}");
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1>Topics</h1>
        <p className={s.description}>
          Efficiently organize and customize your chatbot&apos;s knowledge with
          Infin AI&apos;s intuitive topic management system.
        </p>
      </header>

      <form
        className={s.searchForm}
        onSubmit={handleSubmit((values) => {
          setFilters(values);
        })}
      >
        <Input
          startAdornment={<BsSearch className={s.searchIcon} />}
          control={control}
          name="topic"
          placeholder="Search topics"
        />
        <button className="btn secondary">Search</button>
        <button
          className="btn primary"
          type="button"
          onClick={() => setAddNew(true)}
        >
          Add New Topic
        </button>
      </form>

      <Table
        url={endpoints.topics}
        className={s.topics}
        pagination
        filters={filters}
        columns={[
          { label: "Topic" },
          { label: "Show on Chat", className: "center" },
          { label: "Files", className: "center" },
          { label: "URLs", className: "center" },
          { label: "Action", className: "center" },
        ]}
        renderRow={(row, i) => (
          <tr key={row._id}>
            <td className="ellepsis line-2">
              <span className={s.cellLabel}>Topic: </span>
              {row.topic}
            </td>
            <td className="center">
              <span className={s.cellLabel}>Show on Chat: </span>
              {row.showOnChat ? "Yes" : "No"}
            </td>
            <td className="center">
              <span className={s.cellLabel}>Files: </span>
              {row.files.length}
            </td>
            <td className="center">
              <span className={s.cellLabel}>URLs: </span>
              {row.urls.length}
            </td>
            <td className={`tableActions ${s.actions}`}>
              <Menu
                button={
                  <button className="btn clear small">
                    <BiSolidDownArrow />
                  </button>
                }
                options={[
                  { label: "Edit", onClick: () => setAddNew(row) },
                  {
                    label: "Delete",
                    onClick: () =>
                      Prompt({
                        type: "confirmation",
                        message: `Are you sure you want to remove this Topic?`,
                        callback: () => {
                          dltTopic({}, { params: { "{_id}": row._id } }).then(
                            ({ data }) => {
                              if (data.success) {
                                setFilters((prev) => ({ ...prev }));
                              } else {
                                Prompt({
                                  type: "error",
                                  message: data.message,
                                });
                              }
                            }
                          );
                        },
                      }),
                  },
                ]}
              />
            </td>
          </tr>
        )}
      />

      <Modal
        open={addNew}
        title={addNew?._id ? "Update Topic" : "Add New Topic"}
        setOpen={setAddNew}
        className={s.formModal}
      >
        <Form
          edit={addNew?._id ? addNew : null}
          onSuccess={(newDoc) => {
            setFilters((prev) => ({ ...prev }));
            setAddNew(false);
          }}
        />
      </Modal>
    </main>
  );
}
