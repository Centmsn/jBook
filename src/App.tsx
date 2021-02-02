import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

import CodeEditor from "./components/CodeEditor";

function App() {
  const ref = useRef<any>(null);
  const iframeRef = useRef<any>(null);
  const [input, setInput] = useState("");

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

    iframeRef.current.srcdoc = html;

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

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener("message", (event) => {
          try {
            eval(event.data)
          } catch(err) {
            const root = document.getElementById("root")
            root.innerHTML = "<div style='color: red;'>" + err + "</div>"
            throw err
          }

        }, false)
      </script>
    </body>
  </html>
`;

  return (
    <div className="App">
      <CodeEditor
        initialValue={"dsadsada"}
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleOnClick}>Submit</button>
      </div>

      <iframe
        ref={iframeRef}
        srcDoc={html}
        title="editor"
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
}

export default App;
