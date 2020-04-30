const option = require('../Database/index')

const Login = async (sql) => {
    const data = await option(sql)
    console.log('auth.js', data)
    return data
}

module.exports = {
    Login
}