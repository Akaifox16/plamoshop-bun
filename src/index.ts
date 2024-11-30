import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { addressModule, customerModule, loginModule } from "./modules";
import { Logestic } from "logestic";

const app = new Elysia()
  .use(Logestic.preset('fancy'))
  .use(swagger())
  .group(
    '/api/v1', (app) =>
    app
      .use(customerModule)
      .use(addressModule)
      .use(loginModule)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
