const router = require('koa-router')();  //注意：引入的方式
const Auth = require('../Service/auth')
const URL = require('./url')

router.get('/api', async (ctx, next) => {
    console.log('get  ./api')
    const data = await option()
    console.log('/api',data)
    ctx.body = data;
})

router.get('/news', (ctx,next)=>{
    let url =ctx.url;
    //从request中获取GET请求
    let request =ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    //从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    ctx.body={
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
});

//动态路由请求方式   http://域名/product/123
router.get('/product/:aid', async (ctx)=>{
    console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
    ctx.body=ctx.params;
})

router.post('/postReq', function (ctx, next) {
    ctx.body = ctx.request.body;
})

// 登录
router.post(URL.Login, async (ctx, next) => {
    console.log('/URL.Login ctx.request.body;', ctx.request.body)
    const data = await Auth.Login('SELECT * FROM user')
    console.log('/URL.Login', data)
    ctx.body = data;
})

module.exports = router