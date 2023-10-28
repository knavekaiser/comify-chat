import s from "./page.module.scss";

export default function NotFound() {
  return (
    <main className={`${s.main} body-min-1fr-min`}>
      <div className={s.innerWrapper}>
        <h1>404</h1>
        <p>Some instructions maybe...</p>
      </div>
    </main>
  );
}
