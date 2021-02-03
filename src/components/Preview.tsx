import "./preview.css";

import { useRef, useEffect } from "react";

export interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html>
  <head>
  <style>
  html {
    background-color: white;
  }
  </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = err => {
        const root = document.getElementById("root")
        root.innerHTML = "<div style='color: red;'>" + err + "</div>"
        throw err
      }

      window.addEventListener("error", (e) => {
        e.preventDefault();
        handleError(e.error);
      })

      window.addEventListener("message", (event) => {
        try {
          eval(event.data);
        } catch(err) {
          handleError(err);
        }

      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        srcDoc={html}
        title="editor"
        sandbox="allow-scripts"
      />
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
