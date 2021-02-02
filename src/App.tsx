import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

function App() {
  const ref = useRef<any>(null);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const handleOnClick = async () => {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div className="App">
      <CodeEditor initialValue={""} onChange={(value) => setInput(value)} />

      <div>
        <button onClick={handleOnClick}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
}

export default App;
