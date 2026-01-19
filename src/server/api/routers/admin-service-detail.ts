import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const createServiceDetailSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  detailedDescription: z.string().min(1, "Descrição detalhada é obrigatória"),
  features: z.array(z.string()).min(1, "Pelo menos uma feature é obrigatória"),
  bgImage: z.string().min(1, "Imagem de fundo é obrigatória"),
  iconName: z.string().min(1, "Nome do ícone é obrigatório"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

const updateServiceDetailSchema = createServiceDetailSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

export const adminServiceDetailRouter = createTRPCRouter({
  createServiceDetail: publicProcedure
    .input(createServiceDetailSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.serviceDetail.create({
        data: input,
      });
      return result;
    }),

  getAllServiceDetails: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.serviceDetail.findMany({
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

  updateServiceDetail: publicProcedure
    .input(updateServiceDetailSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const result = await ctx.db.serviceDetail.update({
        where: { id },
        data,
      });
      return result;
    }),

  deleteServiceDetail: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.serviceDetail.delete({
        where: { id: input.id },
      });
      return result;
    }),

  toggleServiceDetail: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.serviceDetail.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
      return result;
    }),

  reorderServiceDetails: publicProcedure
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
        ctx.db.serviceDetail.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      );

      const result = await ctx.db.$transaction(transactions);
      return result;
    }),
});
