import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { addressModule, customerModule } from "./modules";

const app = new Elysia()
  .use(swagger())
  .group(
    '/api/v1', app =>
    app
      .use(customerModule)
      .use(addressModule)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
