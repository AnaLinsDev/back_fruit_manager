import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function createProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/products",
    {
      schema: {
        body: z.object({
          acronym: z.string(),
          description: z.string(),
        }),
      },
    },
    async (request) => {
      const { acronym, description } = request.body;

      const product = await prisma.product.create({
        data: {
          acronym: acronym,
          description: description,
        },
      });

      return { productId: product.id };
    }
  );
}
