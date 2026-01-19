import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const processRouter = createTRPCRouter({
  getActiveProcessSteps: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.processStep.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return result;
  }),

  getProcessStepById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.processStep.findUnique({
        where: { id: input.id },
      });
      return result;
    }),
});
