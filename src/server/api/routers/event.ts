import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      orderBy: { date: "asc" },
      take: 6,
    });
  }),
});
