import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function updateProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/products/:prod_id",
    {
      schema: {
        params: z.object({
          prod_id: z.uuid(),
        }),

        body: z.object({
          acronym: z.string(),
          description: z.string(),
        }),
      },
    },
    async (request) => {
      const { prod_id } = request.params;
      const { acronym, description } = request.body;

      const product = await prisma.product.update({
        where: {
          id: prod_id,
        },
        data: {
          acronym: acronym,
          description: description,
        },
      });

      return { productId: product.id };
    }
  );
}
