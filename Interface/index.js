const router = require('koa-router')();  //注意：引入的方式
const URL = require('./url')
const Auth = require('../Service/auth')
const Permission = require('../Service/permission')
const Util = require('../Utils/util')

// router.get('/api', async (ctx, next) => {
//     console.log('get  ./api')
//     const data = await option()
//     console.log('/api',data)
//     ctx.body = data;
// })

// router.get('/news', (ctx,next)=>{
//     let url =ctx.url;
//     //从request中获取GET请求
//     let request =ctx.request;
//     let req_query = request.query;
//     let req_querystring = request.querystring;
//     //从上下文中直接获取
//     let ctx_query = ctx.query;
//     let ctx_querystring = ctx.querystring;
//     ctx.body={
//         url,
//         req_query,
//         req_querystring,
//         ctx_query,
//         ctx_querystring
//     }
// });

// //动态路由请求方式   http://域名/product/123
// router.get('/product/:aid', async (ctx)=>{
//     console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
//     ctx.body=ctx.params;
// })

// 登录
router.post(URL.Login, async (ctx, next) => {
    const {username, password} = ctx.request.body
    let SQL = `SELECT * FROM user WHERE name = "${username}" AND password = "${password}"`
    const data = await Auth.Login(SQL)
    ctx.body = data;
})

// 获取用户信息
router.post(URL.GetInfo, async (ctx, next) => {
    const {token} = ctx.request.body
    let SQL = `SELECT permission FROM user WHERE token = "${token}"`
    const data = await Auth.GetInfo(SQL)
    ctx.body = data;
})

// 退出
router.post(URL.Logout, async (ctx, next) => {
    const data = await Auth.Logout()
    ctx.body = data;
})

// 获取权限列表
router.post(URL.List, async (ctx, next) => {
    let SQL = `SELECT * FROM user`
    // 拼接条件
    const condition = await Util.SpliceSelectSql(ctx.request.body)
    SQL = SQL + condition
    const data = await Permission.Query(SQL)
    ctx.body = data;
})

// 获取权限详细
router.get(URL.Detail, async (ctx, next) => {
    const {id} = ctx.query
    let SQL = `SELECT * FROM user WHERE id = "${id}"`
    const data = await Permission.Query(SQL)
    ctx.body = data;
})

// 更新权限信息
router.post(URL.Update, async (ctx, next) => {
    const {id, name, password, permissionList} = ctx.request.body
    const permissionStr = Util.arrToStr(permissionList)
    let SQL = `UPDATE user SET name = "${name}", password = "${password}", permission = "${permissionStr}" WHERE id = "${id}"`
    const data = await Permission.Update(SQL)
    ctx.body = data;
})

// 新增权限信息
router.post(URL.Insert, async (ctx, next) => {
    const {id, name, password, permissionList} = ctx.request.body
    const token = Util.randomString(14)
    const permissionStr = Util.arrToStr(permissionList)
    let SQL = `INSERT INTO user VALUES ("${id}", "${name}", "${password}", "${permissionStr}", "${token}")`
    const data = await Permission.Insert(SQL)
    ctx.body = data;
})

// 删除
router.get(URL.Delete, async (ctx, next) => {
    const {id} = ctx.query
    let SQL = `DELETE FROM user WHERE id = "${id}"`
    const data = await Permission.Delete(SQL)
    ctx.body = data;
})

module.exports = router