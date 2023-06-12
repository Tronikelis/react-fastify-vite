import type {
    PageContextBuiltInClientWithClientRouting,
    PageContextBuiltInClientWithServerRouting,
} from "vite-plugin-ssr/types";

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = {};

export type PageContextCustom = {
    Page: Page;
    pageProps?: PageProps;
    urlPathname: string;
    exports: {
        documentProps?: {
            title?: string;
            description?: string;
        };
    };
};

type PageContextServer = PageContextBuiltInClientWithServerRouting<Page> &
    PageContextCustom;
type PageContextClient = PageContextBuiltInClientWithClientRouting<Page> &
    PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
