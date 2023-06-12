import React from "react";
import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";

import { PageContextServer } from "./types";

export default function onRenderHtml(pageContext: PageContextServer) {
    const { Page } = pageContext;
    const viewHtml = dangerouslySkipEscape(renderToString(<Page />));

    return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`;
}
