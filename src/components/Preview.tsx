import { useRef, useEffect } from "react";

export interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      title="editor"
      sandbox="allow-scripts"
    />
  );
};

export default Preview;
