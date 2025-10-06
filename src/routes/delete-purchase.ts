import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function deletePurchase(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
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

      const purchase =await prisma.purchaseRecord.delete({
        where: {
          id: purchaseId,
        },
      });

      if (!purchase) {
        return reply.status(404).send({ message: "Purchase not found." });
      }

      return { message: "Purchase deleted." };
    }
  );
}
