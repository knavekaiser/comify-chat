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
import { Moment } from "@/components/moment";
import { useFetch } from "@/utils/hooks";
import { Modal, Prompt } from "@/components/modal";
import FullChat from "./FullChat";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function Home() {
  const { control, handleSubmit } = useForm();
  const [filters, setFilters] = useState({});
  const [view, setView] = useState(false);
  const { remove: dltChat } = useFetch(endpoints.chats + "/{_id}");
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1 className={space_grotesk.className}>Chats</h1>
        <p className={s.description}>
          Take full control of your chatbot interactions with Infin AI&apos;s
          comprehensive chat management tools.
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
      </form>

      <Table
        url={endpoints.chats}
        className={s.topics}
        pagination
        filters={filters}
        columns={[
          { label: "Date & Time" },
          { label: "User" },
          { label: "Topic" },
          { label: "Action" },
        ]}
        renderRow={(row, i) => (
          <tr key={row._id}>
            <td>
              <Moment format="DD MMM YYYY hh:mma">{row.createdAt}</Moment>
            </td>
            <td className="ellepsis line-2">{row.user?.name}</td>
            <td>{row.topic}</td>
            <td className="tableActions">
              <Menu
                button={
                  <button className="btn clear small">
                    <BiSolidDownArrow />
                  </button>
                }
                options={[
                  { label: "View", onClick: () => setView(row) },
                  {
                    label: "Delete",
                    onClick: () =>
                      Prompt({
                        type: "confirmation",
                        message: `Are you sure you want to remove this Chat?`,
                        callback: () => {
                          dltChat({}, { params: { "{_id}": row._id } }).then(
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
        open={view}
        title={`Chat`}
        className={s.fullChatModal}
        setOpen={setView}
      >
        <FullChat chat={view} />
      </Modal>
    </main>
  );
}
