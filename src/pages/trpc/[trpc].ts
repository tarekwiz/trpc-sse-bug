import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { appRouter } from "../../server/trpc";
export const ALL: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: opts.request,
    router: appRouter,
  });
};
