const SplitArr = (data, rule = '') => {
    const result = data.split(rule)
    return result
}

const arrToStr = (data) => {
    let str = data.reduce((accumulator, currentValue, currentIndex, array) => {
        const str = currentIndex < (array.length - 1)? `${currentValue},` : `${currentValue}`
        return accumulator + str;
      }, '')
    return str
}

// SELECT语句动态SQL拼接
const SpliceSelectSql = (body) => {
    let SQL = ``
    SQL = SQL + ` WHERE`
    for (const key in body) {
        if (body.hasOwnProperty(key)) {
            const value = body[key];
            if (!value) {
                continue
            }
            if (SQL.indexOf('=') != -1) {
                // 首个key不需要AND字段
                SQL = SQL + ` AND ${key} = "${value}"`
            } else {
                SQL = SQL + ` ${key} = "${value}"`
            }
        }
    }
    if (SQL.indexOf('=') === -1) {
        SQL = ``
    }
    return SQL
}

// 生成随机字符串
const randomString = (max) => {
    let str = ""
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生，i为指定长度
    for (let i = 0; i < max; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

module.exports = {
    SplitArr,
    arrToStr,
    SpliceSelectSql,
    randomString
}