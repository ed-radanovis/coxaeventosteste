import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import z from "zod";

export const displayCaseRouter = createTRPCRouter({
  // search actives for frontend
  getActiveDisplayCases: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.showcase.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }),

  // get by ID
  getDisplayCaseById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.showcase.findUnique({
        where: { id: input.id },
      });
    }),
});
