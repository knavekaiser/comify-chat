"use client";

import pageStyle from "../page.module.scss";
import s from "./page.module.scss";
import { useForm } from "react-hook-form";
import { CalendarInput, Combobox } from "@/components/formElements";
import endpoints from "@/utils/endpoints";
import { useCallback, useEffect, useState } from "react";
import { Prompt } from "@/components/modal";
import { useFetch, useYup } from "@/utils/hooks";
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
import { Moment, moment } from "@/components/moment";
import { FiRefreshCw } from "react-icons/fi";
import * as yup from "yup";

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

const validationSchema = yup.object({
  dateRange: yup.string(),
  customDate: yup.object().when("dateRange", ([dateRange], schema) => {
    if (dateRange === "custom") {
      return schema.required("Please select custom dates");
    }
    return schema;
  }),
});

export default function Home() {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      granularity: "day",
      dateRange: "current_month",
    },
    resolver: useYup(validationSchema),
  });
  const [filters, setFilters] = useState({
    minDate: new Date(new Date().setDate(1)),
    maxDate: new Date(),
  });
  const [data, setData] = useState({});

  const { get: fetchAnalytics, loading } = useFetch(endpoints.analytics);
  const getAnalytics = useCallback((query) => {
    fetchAnalytics({
      query,
    })
      .then(({ data }) => {
        // console.log(data.data);
        if (!data.success) {
          return Prompt({ type: "error", message: data.message });
        }
        setData(data.data);
      })
      .catch((err) => Prompt({ type: "error", message: err.message }));
  }, []);

  const dateRange = watch("dateRange");
  const granularity = watch("granularity");

  useEffect(() => {
    getAnalytics({
      minDate: moment(filters.minDate, "YYYY-MM-DD"),
      maxDate: moment(filters.maxDate, "YYYY-MM-DD"),
      granularity: filters.granularity || "day",
    });
  }, [filters]);
  return (
    <main className={`${pageStyle.main} ${s.main}`}>
      <header>
        <h1>Analytics</h1>
        <p className={s.description}>
          Uncover valuable insights and drive data-backed decisions with Infin
          AI&apos;s powerful analytics.
        </p>
      </header>

      <form
        className={s.dateFilter}
        onSubmit={handleSubmit((values) => {
          const query = {
            minDate: filters.minDate,
            maxDate: filters.maxDate,
            granularity: values.granularity,
          };
          if (values.dateRange === "current_month") {
            query.minDate = new Date(new Date().setDate(1));
            query.maxDate = new Date();
          } else if (values.dateRange === "last_7_days") {
            query.minDate = new Date(
              new Date().setDate(new Date().getDate() - 7)
            );
            query.maxDate = new Date();
          } else if (values.dateRange === "last_28_days") {
            query.minDate = new Date(
              new Date().setDate(new Date().getDate() - 28)
            );
            query.maxDate = new Date();
          } else if (values.dateRange === "last_year") {
            query.minDate = new Date(
              new Date().setFullYear(new Date().getFullYear() - 1)
            );
            query.maxDate = new Date();
          } else if (values.dateRange === "custom") {
            query.minDate = values.customDate?.startDate;
            query.maxDate = values.customDate?.endDate;
          }
          // console.log(values, query);
          setFilters(query);
          // getAnalytics(query);
        })}
      >
        <Combobox
          label="Frequency"
          control={control}
          name="granularity"
          options={[
            { label: "Day", value: "day" },
            { label: "Month", value: "month" },
          ]}
          onChange={(e) => {
            if (e.value === "month") {
              setValue("dateRange", "last_year");
            }
          }}
        />
        <Combobox
          label="Date Range"
          control={control}
          name="dateRange"
          options={[
            ...(granularity === "day"
              ? [
                  { label: "This Month", value: "current_month" },
                  { label: "Last 7 days", value: "last_7_days" },
                  { label: "Last 28 days", value: "last_28_days" },
                ]
              : []),
            { label: "Last year", value: "last_year" },
            { label: "Custom", value: "custom" },
          ]}
        />
        {dateRange === "custom" && (
          <CalendarInput
            popup
            label="From - To"
            control={control}
            name="customDate"
            dateWindow="pastIncludingToday"
          />
        )}
        <button className={`btn small secondary ${s.btn}`}>
          <FiRefreshCw />
        </button>
      </form>

      <section className={s.graphSection}>
        <div className={s.head}>
          <h2>
            Total Chats Per Topics from{" "}
            <Moment format="DD MMM YY">{filters.minDate}</Moment> to{" "}
            <Moment format="DD MMM YY">{filters.maxDate}</Moment>
          </h2>
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
          <h2>
            Total Chats Per {granularity} from{" "}
            <Moment format="DD MMM YY">{filters.minDate}</Moment> to{" "}
            <Moment format="DD MMM YY">{filters.maxDate}</Moment>
          </h2>
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

      <section className={s.graphSection}>
        <div className={s.head}>
          <h2>
            Total Usage Per {granularity} from{" "}
            <Moment format="DD MMM YY">{filters.minDate}</Moment> to{" "}
            <Moment format="DD MMM YY">{filters.maxDate}</Moment>
          </h2>
          <p className={s.description}>
            Track chat usage over time, optimize support, and allocate resources
            strategically for seamless interactions.
          </p>
        </div>
        <div className={s.chart}>
          {data?.tokenUsageOverTime ? (
            <Bar
              options={barOptions}
              data={{
                labels: data.tokenUsageOverTime.labels,
                datasets: [
                  {
                    label: "Total Usage",
                    data: data.tokenUsageOverTime.data,
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
