import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const createDisplayCaseSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  image: z.string().min(1, "Imagem é obrigatória"),
  href: z.string().min(1, "URL é obrigatória"),
  type: z.enum(["video", "youtube"]),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

const updateDisplayCaseSchema = createDisplayCaseSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

export const adminDisplayCaseRouter = createTRPCRouter({
  createDisplayCase: publicProcedure
    .input(createDisplayCaseSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.showcase.create({
        data: input,
      });
    }),

  getAllDisplayCases: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.showcase.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  }),

  updateDisplayCase: publicProcedure
    .input(updateDisplayCaseSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.showcase.update({
        where: { id },
        data,
      });
    }),

  deleteDisplayCase: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.showcase.delete({
        where: { id: input.id },
      });
    }),

  toggleDisplayCase: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.showcase.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
    }),
  updateDisplayCaseOrder: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        order: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.showcase.update({
        where: { id: input.id },
        data: { order: input.order },
      });
    }),

  reorderDisplayCases: publicProcedure
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
        ctx.db.showcase.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      );

      return await ctx.db.$transaction(transactions);
    }),
});
