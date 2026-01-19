import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { eventRouter } from "./routers/event";
import { adminRouter } from "./routers/admin-event";
import { displayCaseRouter } from "./routers/display_case";
import { adminDisplayCaseRouter } from "./routers/admin-display_case";
import { teamMemberRouter } from "./routers/team-member";
import { adminTeamMemberRouter } from "./routers/admin-team-member";
import { adminProcessRouter } from "./routers/admin-process";
import { adminServiceDetailRouter } from "./routers/admin-service-detail";
import { processRouter } from "./routers/process";
import { serviceDetailRouter } from "./routers/service-detail";

export const appRouter = createTRPCRouter({
  event: eventRouter,
  admin: adminRouter,
  displayCase: displayCaseRouter,
  adminDisplayCase: adminDisplayCaseRouter,
  adminTeamMember: adminTeamMemberRouter,
  teamMember: teamMemberRouter,
  adminProcess: adminProcessRouter,
  adminServiceDetail: adminServiceDetailRouter,
  process: processRouter,
  serviceDetail: serviceDetailRouter,
  // adicionar
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
