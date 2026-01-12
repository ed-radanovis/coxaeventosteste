import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import z from "zod";

export const teamMemberRouter = createTRPCRouter({
  // search actives for frontend
  getActiveTeamMembers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.teamMember.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }),

  // get by ID
  getTeamMemberById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.teamMember.findUnique({
        where: { id: input.id },
      });
    }),
});
