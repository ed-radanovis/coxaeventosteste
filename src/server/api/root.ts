// import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

// /**
//  * This is the primary router for your server.
//  *
//  * All routers added in /api/routers should be manually added here.
//  */
// export const appRouter = createTRPCRouter({
//   // Temporariamente vazio; será preenchido com routers para eventos/testimonials
// });

// // export type definition of API
// export type AppRouter = typeof appRouter;

// /**
//  * Create a server-side caller for the tRPC API.
//  * @example
//  * const trpc = createCaller(createContext);
//  * const res = await trpc.post.all();
//  *       ^? Post[]
//  */
// export const createCaller = createCallerFactory(appRouter);

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { eventRouter } from "./routers/event";
import { adminRouter } from "./routers/admin-event";
import { displayCaseRouter } from "./routers/display_case";
import { adminDisplayCaseRouter } from "./routers/admin-display_case";

export const appRouter = createTRPCRouter({
  event: eventRouter,
  admin: adminRouter,
  displayCase: displayCaseRouter,
  adminDisplayCase: adminDisplayCaseRouter,
  // depois adicionamos: testimonial, news, etc.
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
