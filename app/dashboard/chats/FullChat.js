import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { Fragment, useState } from "react";
import s from "./page.module.scss";
import { Modal } from "@/components/modal";
import { Moment } from "@/components/moment";

const Detail = ({ label, value }) => {
  return (
    <div className={s.detail}>
      <h5>{label}:</h5>
      <p>{value}</p>
    </div>
  );
};

const FullChat = ({ chat }) => {
  const [viewContext, setViewContext] = useState(false);
  return (
    <div className={`grid gap-1 ${s.fullChat}`}>
      <div className={`grid p-1 gap-1 ${s.details}`}>
        <div className={s.user}>
          <h4>{chat.user?.name}</h4>
          <p>{chat.user?.phone}</p>
          <p>{chat.user?.email}</p>
        </div>

        <div className={s.other}>
          <Detail
            label="Chat Started"
            value={
              <Moment format="DD MMM YYYY hh:mma">{chat.createdAt}</Moment>
            }
          />
          <Detail
            label="Last Message"
            value={
              <Moment format="DD MMM YYYY hh:mma">{chat.updatedAt}</Moment>
            }
          />
          <Detail label="Total Messages" value={chat.messages.length - 1} />
          <Detail
            label="Assistant Response"
            value={
              chat.messages.filter((item) => item.role === "assistant").length
            }
          />
          <Detail
            label="Total Disliked Messages"
            value={
              chat.messages.filter(
                (item) => item.role === "assistant" && item.like === false
              ).length
            }
          />
        </div>

        <button
          className="btn secondary"
          onClick={() => setViewContext(!viewContext)}
        >
          View Context
        </button>
      </div>
      <div className={s.messages}>
        {chat.messages
          .filter((item) => item.name !== "System")
          .map((item, i, arr) => (
            <Fragment key={item._id}>
              {arr[i - 1] &&
                new Date(arr[i - 1].createdAt).getDate() !==
                  new Date(item.createdAt).getDate() && (
                  <p className={s.date}>
                    <Moment format="DD MMM YYYY">{item.createdAt}</Moment>
                  </p>
                )}
              {i === 0 && (
                <p className={s.date}>
                  <Moment format="DD MMM YYYY">{item.createdAt}</Moment>
                </p>
              )}
              <Message msg={item} />
            </Fragment>
          ))}
      </div>

      {viewContext && (
        <Modal open={viewContext} setOpen={setViewContext} title="Context">
          <div className={s.chatContext}>
            {chat.messages[0]?.content
              .split("\n")
              .map((item, i) => (item ? <p key={i}>{item}</p> : null))}
          </div>
        </Modal>
      )}
    </div>
  );
};

const Message = ({ msg, style }) => {
  return (
    <div className={`${s.msg} ${s[msg.role]}`} style={style}>
      {msg.role === "assistant" && (
        <div className={s.actions}>
          {msg.like && <HiThumbUp />}
          {msg.like === false && <HiThumbDown />}
        </div>
      )}
      <p className={s.content}>{msg.content}</p>
      <Moment format="hh:mma">{msg.createdAt}</Moment>
    </div>
  );
};

export default FullChat;
