import React, { useState, useEffect, timeout } from "react";
import { render } from "react-dom";

function Popup() {
  const [link, setLink] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [execute, setExecute] = useState(false);

  useEffect(() => {
    if (execute) {
      if (clickCount === 1 && link) {
        window.open(link, "_blank");
      } else if (clickCount > 1 && link) {
        window.open(link, "popup", "width=600,height=600");
      }
      setExecute(false);
      setClickCount(0);
    }

    return () => clearTimeout(timeout);
  }, [execute]);

  const handleLinkClick = (event) => {
    if (event.target.tagName === "A") {
      setLink(event.target.href);
      setClickCount((prev) => prev + 1);
      event.preventDefault();
    }
    setTimeout(() => {
      setExecute(true);
    }, 500);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleLinkClick);

    return () => {
      document.body.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <div>
      <h1>Quick Peek Extension</h1>
      <p>Click a link. If there are two clicks within 1 second, it opens in a popup.</p>
      <a href="https://korosiandras.com/">https://korosiandras.com/</a>
      <div>link: {link}</div>
      <div>click count: {clickCount}</div>
      <div>exeute: {execute ? "true" : "false"}</div>
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));
