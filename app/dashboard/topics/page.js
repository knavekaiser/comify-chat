"use client";

import { Space_Grotesk } from "next/font/google";
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
import { Modal } from "@/components/modal";
import Form from "./form";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function Home() {
  const { control, handleSubmit } = useForm();
  const [filters, setFilters] = useState({});
  const [addNew, setAddNew] = useState(false);
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1 className={space_grotesk.className}>Topics</h1>
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
          { label: "Show on Chat" },
          { label: "Files" },
          { label: "URLs" },
          { label: "Action" },
        ]}
        renderRow={(row, i) => (
          <tr key={row._id}>
            <td className="ellepsis line-2">{row.topic}</td>
            <td>{row.showOnChat ? "Yes" : "No"}</td>
            <td>{row.files.length}</td>
            <td>{row.urls.length}</td>
            <td className="tableActions">
              <Menu
                button={
                  <button className="btn clear small">
                    <BiSolidDownArrow />
                  </button>
                }
                options={[
                  { label: "Edit", onClick: () => setAddNew(row) },
                  { label: "Delete", onClick: () => {} },
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
