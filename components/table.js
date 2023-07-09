"use client";

import { useFetch } from "@/utils/hooks";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCircleNotch } from "react-icons/fa";

import s from "./table.module.scss";
import { Prompt } from "./modal";

export const Table = ({
  columns,
  className,
  theadTrStyle,
  tbodyTrStyle,
  children,
  actions,
  loading,
  placeholder,
  renderRow,
  pagination,
  url,
  filters,
  tfoot,
}) => {
  const [metadata, setMetadata] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
  });
  const [dynamicData, setDynamicData] = useState([]);
  const { get: fetchData, loading: loadingData } = useFetch(url);

  const getData = useCallback(
    (newMetadata) => {
      fetchData({
        query: {
          ...(pagination && {
            page: metadata.page,
            pageSize: metadata.pageSize,
            ...newMetadata,
          }),
          ...filters,
        },
      })
        .then(({ data }) => {
          if (data.success) {
            setDynamicData(data.data);
            setMetadata(data.metadata);
          } else {
            Prompt({ type: "error", message: data.message });
          }
        })
        .catch((err) => Prompt({ type: "error", message: err.message }));
    },
    [metadata, filters]
  );

  useEffect(() => {
    if (url) {
      getData({ page: 1 });
    }
  }, [filters]);

  return (
    <table
      className={`${s.table} ${className || ""} ${actions ? s.actions : ""}`}
      cellPadding={0}
      cellSpacing={0}
    >
      {columns && (
        <thead>
          <tr style={theadTrStyle}>
            {columns.map((column, i) => (
              <th
                key={i}
                className={`${column.action ? s.action : ""} ${
                  column.className || ""
                }`}
                style={{ ...column.style }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {loading || loadingData ? (
          <tr className={s.loading}>
            <td>
              <span className={s.icon}>
                <FaCircleNotch />
              </span>
            </td>
          </tr>
        ) : (children || dynamicData).length > 0 ? (
          <>{children || dynamicData.map((item, i) => renderRow(item, i))}</>
        ) : (
          <tr className={s.placeholder} style={tbodyTrStyle}>
            <td>{placeholder || "Nothing yet..."}</td>
          </tr>
        )}
      </tbody>
      {tfoot}
      {pagination && (
        <tfoot>
          <tr className={s.pagination}>
            <td>
              {metadata.total > 0 && (
                <span className={s.pageSummary}>
                  {metadata.pageSize * (metadata.page - 1) + 1}-
                  {metadata.pageSize * (metadata.page - 1) + dynamicData.length}{" "}
                  of {metadata.total}
                </span>
              )}
              <button
                title="Previous Page"
                className="btn small"
                disabled={metadata.page <= 1}
                onClick={() => {
                  getData({ page: metadata.page - 1 });
                }}
              >
                <FaChevronLeft />
              </button>
              <span className={s.currentPage}>{metadata.page}</span>
              <button
                title="Next Page"
                className="btn small"
                disabled={
                  !metadata.total ||
                  metadata.page * metadata.pageSize >= metadata.total
                }
                onClick={() => {
                  getData({ page: metadata.page + 1 });
                }}
              >
                <FaChevronRight />
              </button>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};
