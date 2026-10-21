import { useEffect, useState } from "react";
import "./Loader.css";

const MESSAGES = [
  "Simmering ideas…",
  "Tasting flavors…",
  "Balancing the seasoning…",
  "Plating it up…",
];

export default function Loader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__pot">
        <span className="loader__steam loader__steam--1" />
        <span className="loader__steam loader__steam--2" />
        <span className="loader__steam loader__steam--3" />
        <div className="loader__pot-body">
          <div className="loader__pot-lid" />
        </div>
      </div>
      <p className="loader__text">{MESSAGES[messageIndex]}</p>
    </div>
  );
}
