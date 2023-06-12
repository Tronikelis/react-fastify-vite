import type { Config } from "vite-plugin-ssr/types";

export default {
    passToClient: ["pageProps"],
    clientRouting: true,
    hydrationCanBeAborted: true,
} satisfies Config;
