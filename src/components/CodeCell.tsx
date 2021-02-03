import { useState, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={""} onChange={value => setInput(value)} />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
