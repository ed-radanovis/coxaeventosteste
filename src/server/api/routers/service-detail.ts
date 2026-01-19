import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const serviceDetailRouter = createTRPCRouter({
  getActiveServiceDetails: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.serviceDetail.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return result;
  }),

  getServiceDetailById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.serviceDetail.findUnique({
        where: { id: input.id },
      });
      return result;
    }),
});
