import React from "react";
import ReactDOM from "react-dom/client";

import type { PageContextClient } from "./types";

let root: ReactDOM.Root;
// eslint-disable-next-line @typescript-eslint/require-await
export default async function onRenderClient(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    const page = <Page {...pageProps} />;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const container = document.getElementById("page-view")!;
    if (pageContext.isHydration) {
        root = ReactDOM.hydrateRoot(container, page);
    } else {
        if (!root) {
            root = ReactDOM.createRoot(container);
        }
        root.render(page);
    }
}
