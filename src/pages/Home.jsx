import Landing from "../components/Landing";
import Projects from "../components/Projects";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timeout = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // try 100–200ms for reliability

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Landing />
      <Projects />
    </>
  );
}
