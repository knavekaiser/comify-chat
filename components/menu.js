"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import s from "./menu.module.scss";
import Link from "next/link";

export default function Menu({ className, button, options }) {
  const [open, setOpen] = useState(false);
  const menu = useRef();
  const btn = useRef();

  useEffect(() => {
    if (open) {
      const btnRect = btn.current.getBoundingClientRect();
      menu.current.style.left = `${
        btnRect.x + btn.current.clientWidth - menu.current.clientWidth
      }px`;
      menu.current.style.top = `${btnRect.y + btn.current.clientHeight + 2}px`;
    }
  }, [open]);
  return (
    <>
      <span
        className={className}
        ref={btn}
        onClick={() => {
          if (open) {
            menu.current.close();
            setOpen(false);
          } else {
            menu.current.showModal();
            setOpen(true);
          }
        }}
      >
        {button || <button type="button">Menu</button>}
      </span>
      <dialog
        ref={menu}
        className={s.menu}
        onClick={(e) => {
          menu.current.close();
          setOpen(false);
        }}
      >
        <div className={s.innerWrapper}>
          {options.map((item) => (
            <Fragment key={item.label}>
              {item.component}
              {item.href && (
                <Link key={item.label} title={item.label} href={item.href}>
                  {item.label}
                </Link>
              )}
              {item.onClick && (
                <button type="button" title={item.label} onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </Fragment>
          ))}
        </div>
      </dialog>
    </>
  );
}
