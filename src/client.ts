import {
  createTRPCClient,
  splitLink,
  unstable_httpSubscriptionLink,
  httpBatchLink,
} from "@trpc/client";
import type { AppRouter } from "./server/trpc";

const url = import.meta.env.SSR
  ? "http://localhost" //Just as placeholder for SSR
  : `${document.location.origin}/trpc`;

export const client = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === "subscription";
      },
      true: unstable_httpSubscriptionLink({
        url: url,
        reconnectAfterInactivityMs: 20000, // 20 seconds
      }),
      false: httpBatchLink({
        url,
      }),
    }),
  ],
});
