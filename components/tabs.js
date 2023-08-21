import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import s from "./tabs.module.scss";

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className,
  secondary,
  tertiary,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (
      !onChange &&
      !tabs.some((tab) => pathname.includes(tab?.path?.replace("/*", "")))
    ) {
      router.push(tabs[0]?.path, { replace: true });
    }
  }, [pathname]);
  return (
    <div
      className={`${s.tabs} ${className || ""} ${
        secondary ? s.secondary : ""
      } ${tertiary ? s.tertiary : ""}`}
      data-testid="tabs"
    >
      {tabs
        .filter((item) => onChange || item.path)
        .map((tab) =>
          onChange ? (
            <a
              key={tab.value}
              className={tab.value === activeTab ? s.active : ""}
              onClick={() => onChange(tab)}
            >
              {tab.label}
            </a>
          ) : (
            <Link
              key={tab.path}
              to={{
                pathname: tab.path,
                ...(tab.search && {
                  search: `?${createSearchParams(tab.search)}`,
                }),
              }}
              className={
                pathname?.includes("/" + tab.path.replace("/*", ""))
                  ? s.active
                  : ""
              }
            >
              {tab.label}
            </Link>
          )
        )}
      <span className={s.fill} />
    </div>
  );
};

export default Tabs;
