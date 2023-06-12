import type { Config } from "vite-plugin-ssr/types";

export default {
    passToClient: ["pageProps", "urlPathname"],
    clientRouting: true,
    hydrationCanBeAborted: true,
} satisfies Config;
