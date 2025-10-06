import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function updateProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
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
      return `UPDATE PRODUCTS: ${prod_id}`;
    }
  );
}
