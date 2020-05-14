const option = require('../Database/index')

const Login = async (sql) => {
    const data = await option(sql)
    return data
}

const Logout = async () => {
    const data = {
        code: 200,
        data: {},
        message: '请求成功'
    }
    return data
}

const GetInfo = async (sql) => {
    const data = await option(sql)
    if (data.code === -1) {
        return data
    }
    const result = data.data[0].permission.split(',')
    data.data = result
    return data
}

module.exports = {
    Login,
    GetInfo,
    Logout
}