import { Application } from "https://deno.land/x/oak@v6.5.0/mod.ts";

import todosRoutes from "./routes/todo.ts";

import { connect } from "./utils/db_utils.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";

connect();

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.response.body = {
      message: "Your request could not be processed!",
    };
    ctx.response.status = 500;
  }
});

app.use(async (ctx, next) => {
  const responseHeaders = ctx.response.headers;
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(async (ctx, next) => {
  console.log("This always runs!");
  await next(); //if any of our other middlewares have async tasks we must put await for all middleware, otherwise
  //a response will be sent before the async tasks are finsihed
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

const envConfig = await config();

const PORT = parseInt(Deno.env.get("PORT") as string);
await app.listen({ port: PORT });
