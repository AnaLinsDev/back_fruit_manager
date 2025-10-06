import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getPurchases(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/purchases", {}, async (request) => {
      const purchases = await prisma.purchaseRecord.findMany();
      return { purchases: purchases };
    });
}
