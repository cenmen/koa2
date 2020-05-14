const option = require('../Database/index')
const Util = require('../Utils/util')

const Query = async (sql) => {
    const data = await option(sql)
    const result = data.data.map((item) => {
        item.permission = Util.SplitArr(item.permission, ',')
        return item
    })
    data.data = result
    return data
}

const Update = async (sql) => {
    const data = await option(sql)
    return data
}

const Insert = async (sql) => {
    const data = await option(sql)
    return data
}

const Delete = async (sql) => {
    const data = await option(sql)
    return data
}

module.exports = {
    Query,
    Update,
    Insert,
    Delete
}