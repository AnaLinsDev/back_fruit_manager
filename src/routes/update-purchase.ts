import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function updatePurchase(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/purchases/:purchaseId",
    {
      schema: {
        params: z.object({
          purchaseId: z.uuid(),
        }),
        body: z.object({
          type: z.string(),
          quantity: z.number(),
          price: z.number(),
          number: z.number(),
          productId: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { purchaseId } = request.params;
      const { type, quantity, price, number, productId } = request.body;

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return reply.status(404).send({ message: "Product not found." });
      }

      const purchase = await prisma.purchaseRecord.update({
        where: {
          id: purchaseId,
        },
        data: {
          type,
          quantity,
          price,
          number,
          productId,
        },
      });

      if (!purchase) {
        return reply.status(404).send({ message: "Purchase not found." });
      }

      return { purchaseId: purchase.id };
    }
  );
}
