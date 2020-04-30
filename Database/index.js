const mysql = require('mysql')

// 创建数据池
const pool  = mysql.createPool({
    host: 'localhost',   // 数据库地址
    user: 'root',    // 数据库用户
    password : '123456',  // 数据库密码
    database : 'sys_permission'  // 选中数据库
})

const res = {
    code: 200,
    data: {},
    message: '请求成功'
}

// 在数据池中进行会话操作
let option = function(sql) {
    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql,  (error, results, fields) => {
                    // 如果有错误就抛出
                    if (error) {
                        res.code = -1;
                        res.message = error
                        reject(res)
                    } else {
                        res.data = results
                        console.log('The solution is: ', res);
                        resolve(res)
                    }
                    // 结束会话
                    connection.release();
                })
            }
        })
    })
}

module.exports = option