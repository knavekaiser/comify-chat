import s from "./page.module.scss";
import { CgSpinner } from "react-icons/cg";

export default function Home() {
  return (
    <main className={s.main}>
      <section className={s.loading}>
        <CgSpinner className={s.icon} />
      </section>
    </main>
  );
}
