import React from "react";
import { hydrateRoot } from "react-dom/client";

import type { PageContextClient } from "./types";

// eslint-disable-next-line @typescript-eslint/require-await
export async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    hydrateRoot(document.getElementById("page-view")!, <Page {...pageProps} />);
}
