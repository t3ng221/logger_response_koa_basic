const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const validate = require("validatorjs");

const app = new koa();
app.use(bodyParser());

const validationRules = {
  name: "string",
  age: "integer",
};

app.use(async (ctx, next) => {
  const bodyData = ctx.request.body;
  const validation = new validate(bodyData, validationRules);
  if (validation.passes()) {
    ctx.status = 200;
    console.log("Validation Successfull");
    ctx.body = `User Name: ${bodyData.name} User Age: ${bodyData.age}`;
  } else {
    await next();
  }
  if (validation.fails()) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
    console.log("server error");
  }
});

app.use(async (ctx) => {
  ctx.status = 400;
  console.log("Validation Failed");
  ctx.body = { errors };
  console.log(errors);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
