import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const createEventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.date(),
  location: z.string().min(1, "Localização é obrigatória"),
  image: z.string().optional(),
  price: z.number().min(0).optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

const updateEventSchema = createEventSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

export const adminRouter = createTRPCRouter({
  // temporary publicProcedure
  createEvent: publicProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.create({
        data: input,
      });
    }),

  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  updateEvent: publicProcedure
    .input(updateEventSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.event.update({
        where: { id },
        data,
      });
    }),

  deleteEvent: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.delete({
        where: { id: input.id },
      });
    }),

  toggleEvent: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.event.update({
        where: { id: input.id },
        data: { isActive: input.isActive },
      });
    }),
});
