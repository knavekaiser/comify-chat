import { Space_Grotesk } from "next/font/google";
import s from "./page.module.scss";
const space_grotesk = Space_Grotesk({ width: "500", subsets: ["latin"] });

export default function NotFound() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <h1 className={space_grotesk.className}>404</h1>
        <p>Some instructions maybe...</p>
      </div>
    </main>
  );
}
