import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function deleteProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/products/:prodId",
    {
      schema: {
        params: z.object({
          prodId: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { prodId } = request.params;

      const product = await prisma.product.delete({
        where: {
          id: prodId,
        },
      });

      if (!product) {
        return reply.status(404).send({ message: "Product not found." });
      }

      return { message: "Product deleted." };
    }
  );
}
