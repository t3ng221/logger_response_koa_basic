const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-body-parser");

app.use(bodyParser());
// Middleware to measure runtime
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  const duration = end - start;
  console.log("App-Response-Time", `${duration}ms`);
});
// other middleware and routes
app.use(async (ctx) => {
  ctx.body = "This is Koa Project";
});

app.listen(7001, () => {
  console.log("Project Running Successfully");
});
