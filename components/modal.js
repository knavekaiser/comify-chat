import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({
  open,
  setOpen,
  children,
  className,
  onBackdropClick,
  clickThroughBackdrop,
  backdropClass,
  style,
  title,
}) => {
  const backdropRef = useRef();

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                type: "spring",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            data-testid="modal"
            className={`modalBackdrop ${backdropClass || ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onBackdropClick?.();
            }}
            style={clickThroughBackdrop ? { pointerEvents: "none" } : {}}
            ref={backdropRef}
          />
          <motion.div
            key="modal"
            initial={{
              opacity: 0,
              scale: 1.3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "ease",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              transition: {
                type: "ease",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            style={{ ...style }}
            className={`modal ${className || ""} ${title ? "withHead" : ""}`}
            onSubmit={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="head">
                {title}{" "}
                <button
                  className="btn clear small"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.querySelector("#portal") || document.body
  );
};

export const Prompt = ({ className, type, message, btns, callback }) => {
  if (type === "error") {
    // console.trace(message);
  }
  let showContent = true;
  const container = document.querySelector("#prompt");
  const root = ReactDOMClient.createRoot(container);
  const cleanup = () => {
    showContent = false;
    root.render(<AnimatePresence></AnimatePresence>);
  };
  const confirm = () => {
    callback();
    cleanup();
  };
  const decline = () => {
    cleanup();
    ["information", "success", "error"].includes(type) &&
      callback &&
      callback();
  };
  root.render(
    <AnimatePresence>
      {showContent && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                type: "spring",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            className={`promptBackdrop`}
          />
          <motion.div
            key="prompt"
            initial={{
              opacity: 0,
              scale: 1.3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "ease",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              transition: {
                type: "ease",
                mass: 0.5,
                damping: 10,
                stiffness: 80,
              },
            }}
            data-testid="prompt"
            className={`prompt ${className || ""}`}
          >
            <div className="content">
              {/* <button className="btn clear close small grey" onClick={decline}>
            <IoClose />
          </button> */}
              {type === "confirmation" && (
                <div className="label confirmation">
                  <span className="svg">?</span>
                  {
                    // <span className="promptLabel">CONFIRMATION</span>
                  }
                </div>
              )}
              {type === "information" && (
                <div className="label information">
                  <span className="svg">i</span>
                  {
                    // <span className="promptLabel">INFORMATION</span>
                  }
                </div>
              )}
              {type === "success" && (
                <div className="label success">
                  <span className="svg">
                    <FaCheck />
                  </span>
                  {
                    // <span className="promptLabel">SUCCESS</span>
                  }
                </div>
              )}
              {type === "error" && (
                <div className="label _error">
                  <span className="svg">
                    <IoClose />
                  </span>
                  {
                    // <span className="promptLabel">ERROR</span>
                  }
                </div>
              )}
              <p className="question">{message}</p>
              <div className="actions">
                {btns || (
                  <>
                    {type === "confirmation" ? (
                      <>
                        <button className="no btn secondary" onClick={decline}>
                          No
                        </button>
                        <button className="yes btn primary" onClick={confirm}>
                          Yes
                        </button>
                      </>
                    ) : (
                      <button className="yes btn primary" onClick={decline}>
                        Ok
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
