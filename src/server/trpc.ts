import { initTRPC } from "@trpc/server";

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure.subscription(async function* ({ ctx, signal }) {
    signal?.addEventListener("abort", () => {
      console.log("aborted");
    });

    try {
      while (!signal?.aborted) {
        console.log("loop", signal, signal?.aborted);

        yield "new data";
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (error) {
      console.error("done", error);
    }
  }),
});
