import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/products/:prod_id",
    {
      schema: {
        params: z.object({
          prod_id: z.uuid(),
        }),
      },
    },
    async (request) => {
      const { prod_id } = request.params;
      return `CREATE PRODUCTS: ${prod_id}`;
    }
  );
}
