import serve from "rollup-plugin-serve";
import html, { makeHtmlAttributes } from "@rollup/plugin-html";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-css-only";

export default {
  input: "src/main.js",
  watch: {
    include: "src/**"
  },
  output: {
    file: "dist/bundle.js",
    format: "umd"
  },
  plugins: [
    css({ output: "bundle.css" }),
    html({
      template: ({ attributes, files, meta, publicPath, title }) => {
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join("\n");

        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join("\n");

        const metas = meta
          .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join("\n");

        return `
          <!doctype html>
          <html${makeHtmlAttributes(attributes.html)}>
            <head>
              ${metas}
              <title>${title}</title>
              ${links}
            </head>
            <body>
              <div id="gjs"></div>
              <div id="blocks"></div>
              ${scripts}
            </body>
          </html>`;
      }
    }),
    serve({
      port: 8081,

      // Multiple folders to serve from
      contentBase: ["dist"]
    }),
    livereload()
  ]
};
