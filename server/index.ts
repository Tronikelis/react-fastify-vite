import path from "node:path";

import middie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import vite from "vite";
import { renderPage } from "vite-plugin-ssr/server";

const isProduction = process.env.NODE_ENV === "production";

const root = path.join(process.cwd(), "/client");

async function startServer() {
    const app = fastify();

    if (isProduction) {
        const distPath = path.join(root, "/dist/client/assets");
        await app.register(fastifyStatic, {
            root: distPath,
            prefix: "/assets/",
        });
    } else {
        await app.register(middie);
        const viteServer = await vite.createServer({
            root,
            server: { middlewareMode: true },
        });
        await app.use(viteServer.middlewares);
    }

    app.get("*", async (req, reply) => {
        const pageContextInit = {
            urlOriginal: req.url,
        };
        const pageContext = await renderPage(pageContextInit);
        const { httpResponse } = pageContext;

        if (!httpResponse) {
            return reply.code(404).type("text/html").send("Not Found");
        }

        const { body, statusCode, contentType } = httpResponse;

        return reply.status(statusCode).type(contentType).send(body);
    });

    const port: number = process.env.PORT ? +process.env.PORT : 3000;

    await app.listen({ port });
    console.log(`Server running at http://localhost:${port}`);
}

startServer().catch(err => {
    console.error("server failed to start", err);
    process.exit(1);
});
