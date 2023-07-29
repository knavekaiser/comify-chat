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
import { useEffect, useState } from "react";
import { Prompt } from "@/components/modal";
import { useFetch } from "@/utils/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const barOptions = {
  plugins: {
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart - Stacked",
    // },
    legend: { display: false },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      display: false,
    },
    y: {
      stacked: true,
    },
  },
};
const barOptionWithLabels = {
  plugins: {
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart - Stacked",
    // },
    legend: { display: false },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const placeholder = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 50, 24],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [35, 15, 45],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: [45, 68, 12],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export default function Home() {
  const { control, handleSubmit } = useForm();
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({});
  const { get: getAnalytics, loading } = useFetch(endpoints.analytics);
  useEffect(() => {
    getAnalytics()
      .then(({ data }) => {
        console.log(data.data);
        if (!data.success) {
          return Prompt({ type: "error", message: data.message });
        }
        setData(data.data);
      })
      .catch((err) => Prompt({ type: "error", message: err.message }));
  }, []);
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      {/* <header>
        <h1 className={space_grotesk.className}>Analytics</h1>
        <p className={s.description}>
          Uncover valuable insights and drive data-backed decisions with Infin
          AI&apos;s powerful analytics.
        </p>
      </header> */}

      {/* <form
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
      </form> */}

      <section className={s.graphSection}>
        <div className={s.head}>
          <h2>Total Chats Per Topics in Last 28 Days</h2>
          <p className={s.description}>
            Explore chat engagement by topics, prioritize resources, and enhance
            customer interactions with data-driven insights.
          </p>
        </div>
        <div className={s.chart}>
          {data?.chatsOverTime ? (
            <Bar
              options={barOptionWithLabels}
              data={{
                labels: data.chatsByTopic.labels,
                datasets: [
                  {
                    label: "Total Chats",
                    data: data.chatsByTopic.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          ) : (
            <p className={s.placeholder}>Not enough data!</p>
          )}
        </div>
      </section>

      <section className={s.graphSection}>
        <div className={s.head}>
          <h2>Total Chats Per Day in Last 28 Days</h2>
          <p className={s.description}>
            Track chat activity trends over time, optimize support, and allocate
            resources strategically for seamless interactions.
          </p>
        </div>
        <div className={s.chart}>
          {data?.chatsOverTime ? (
            <Bar
              options={barOptions}
              data={{
                labels: data.chatsOverTime.labels,
                datasets: [
                  {
                    label: "Total Chats",
                    data: data.chatsOverTime.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          ) : (
            <p className={s.placeholder}>Not enough data!</p>
          )}
        </div>
      </section>
    </main>
  );
}
