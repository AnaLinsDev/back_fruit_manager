import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import z from "zod";

export async function getPurchaseDetail(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/purchases/:purchaseId",
    {
      schema: {
        params: z.object({
          purchaseId: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { purchaseId } = request.params;

      const purchase = await prisma.purchaseRecord.findUnique({
        where: {
          id: purchaseId,
        },
        include: {
          product: true,
        },
      });

      if (!purchase) {
        return reply.status(404).send({ message: "Purchase not found." });
      }

      return { purchase: purchase };
    }
  );
}
