import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { getProducts } from "./routes/get-products";
import { createProduct } from "./routes/create-product";
import { updateProduct } from "./routes/update-product";
import { deleteProduct } from "./routes/delete-product";
import { getPurchases } from "./routes/get-purchases";
import { createPurchase } from "./routes/create-purchase";
import { updatePurchase } from "./routes/update-purchase";
import { deletePurchase } from "./routes/delete-purchase";
import { getPurchaseDetail } from "./routes/get-purchase-detail";

const app = fastify();

//Apenas em DEV coloque o *
app.register(cors, {
  origin: "*",
});

// Configura validação com Zod
app.setValidatorCompiler(validatorCompiler);
// Configura serialização com Zod
app.setSerializerCompiler(serializerCompiler);

//Product
app.register(getProducts);
app.register(createProduct);
app.register(updateProduct);
app.register(deleteProduct);

//Purchase
app.register(getPurchases);
app.register(createPurchase);
app.register(updatePurchase);
app.register(deletePurchase);
app.register(getPurchaseDetail);

app.listen({ port: 3000 }).then(() => {
  console.log("SERVER RUNNING");
});

