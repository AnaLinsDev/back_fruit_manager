import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function updateProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/products/:prodId",
    {
      schema: {
        params: z.object({
          prodId: z.uuid(),
        }),

        body: z.object({
          acronym: z.string(),
          description: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { prodId } = request.params;
      const { acronym, description } = request.body;

      const product = await prisma.product.update({
        where: {
          id: prodId,
        },
        data: {
          acronym: acronym,
          description: description,
        },
      });

      if (!product) {
        return reply.status(404).send({ message: "Product not found." });
      }

      return { productId: product.id };
    }
  );
}
