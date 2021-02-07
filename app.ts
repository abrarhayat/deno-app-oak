import { Application } from "https://deno.land/x/oak@v6.5.0/mod.ts";

import todosRoutes from "./routes/todo.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log("This always runs!");
  await next(); //if any of our other middlewares have async tasks we must put await for all middleware, otherwise
  //a response will be sent before the async tasks are finsihed
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });
