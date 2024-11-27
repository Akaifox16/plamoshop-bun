import { Elysia } from "elysia";
import addressController from "./modules/address/address.controller";

const app = new Elysia()
  .group(
    '/api/v1', app =>
    app
      .use(addressController)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
