import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export function onStart() {
  if (typeof window !== "undefined") {
    // document.querySelector("#pageProgress").style.display = "block";
    document.querySelector("#pageProgress").style.transform = "scale(1, 1)";
  }
}

export function onComplete() {
  if (typeof window !== "undefined") {
    // document.querySelector("#pageProgress").style.display = "none";
    document.querySelector("#pageProgress").style.transform = "scale(1, 0)";
  }
}

function useOnComplete() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  onStart();
  useEffect(() => onComplete(), [pathname, searchParams]);
}

function __RouterEvents() {
  useOnComplete();
  return null;
}

export function RouterEvents() {
  return (
    <Suspense>
      <__RouterEvents />
    </Suspense>
  );
}
