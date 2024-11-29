import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import addressController from "./modules/address/address.controller";

const app = new Elysia()
  .use(swagger())
  .group(
    '/api/v1', app =>
    app
      .use(addressController)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
