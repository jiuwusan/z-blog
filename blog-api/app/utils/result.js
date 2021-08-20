module.exports = function (data, code = 200, msg = "成功") {
    return {
        code,
        msg,
        data
    }
};