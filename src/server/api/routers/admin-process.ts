import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const createProcessStepSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  icon: z.string().min(1, "Ícone é obrigatório"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

const updateProcessStepSchema = createProcessStepSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

export const adminProcessRouter = createTRPCRouter({
  createProcessStep: publicProcedure
    .input(createProcessStepSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.processStep.create({
        data: input,
      });
    }),

  getAllProcessSteps: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.processStep.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }),

  getProcessStepById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.processStep.findUnique({
        where: { id: input.id },
      });
    }),

  updateProcessStep: publicProcedure
    .input(updateProcessStepSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.processStep.update({
        where: { id },
        data,
      });
    }),

  deleteProcessStep: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.processStep.delete({
        where: { id: input.id },
      });
    }),

  toggleProcessStep: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.processStep.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
    }),

  reorderProcessSteps: publicProcedure
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
        ctx.db.processStep.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      );

      return await ctx.db.$transaction(transactions);
    }),
});
