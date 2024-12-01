import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { addressModule, customerModule, loginModule, productModule } from "./modules";
import { Logestic } from "logestic";

const app = new Elysia()
  .use(Logestic.preset('fancy'))
  .use(swagger())
  .group(
    '/api/v1', (app) =>
    app
      .use(loginModule)
      .use(customerModule)
      .use(addressModule)
      .use(productModule)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
