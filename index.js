const Koa = require('koa');
const router = require('./Interface/index');  //注意：引入的方式
var bodyParser = require('koa-bodyparser');
var app = new Koa();
app.use(bodyParser());

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头

app.listen(8000,()=>{
    console.log('starting at port 8000');
});