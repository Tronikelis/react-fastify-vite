import React from "react";
import ReactDOMServer from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";

import type { PageContextServer } from "./types";

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname"];

// eslint-disable-next-line @typescript-eslint/require-await
async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;

    // handle SPA & SSR
    const pageHtml = Page ? ReactDOMServer.renderToString(<Page {...pageProps} />) : "";

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        },
    };
}
