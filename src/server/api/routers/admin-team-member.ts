import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const createTeamMemberSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  role: z.string().min(1, "Cargo é obrigatório"),
  image: z.string().min(1, "Imagem é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  expertise: z.array(z.string()).default([]),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  yearsExperience: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

const updateTeamMemberSchema = createTeamMemberSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

export const adminTeamMemberRouter = createTRPCRouter({
  createTeamMember: publicProcedure
    .input(createTeamMemberSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.teamMember.create({
        data: input,
      });
    }),

  getAllTeamMembers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.teamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }),

  updateTeamMember: publicProcedure
    .input(updateTeamMemberSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.teamMember.update({
        where: { id },
        data,
      });
    }),

  deleteTeamMember: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.teamMember.delete({
        where: { id: input.id },
      });
    }),

  toggleTeamMember: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.teamMember.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
    }),

  reorderTeamMembers: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string().cuid(),
          order: z.number().int(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const transactions = input.map((item) =>
        ctx.db.teamMember.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      );

      return await ctx.db.$transaction(transactions);
    }),
});
