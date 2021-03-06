const validator = require('./validator');
const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');
const request = require('request');
const urllib = require('urllib');

//验证工具类
const tools = {
    /**
     * 格式化时间
     * fmt: yyyy-MM-dd hh:mm:ss
     */
    formatTime(fmt, datetime) {
        let date = new Date();
        if (!validator.isEmpty(datetime)) {
            switch (Object.prototype.toString.call(datetime)) {
                case '[object String]':
                    datetime = datetime.replace(/\-/g, "/");
                    date = new Date(datetime);
                    break;
                case '[object Number]':
                    date = new Date(datetime);
                    break;
            }
        }

        let o = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };

        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 递归创建文件夹
     * @param {*} dirname 
     * @returns 
     */
    mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (tools.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    },

    /**
     * 获取随机字符串
     * @param {*} num 
     * @returns 
     */
    getRanLetter(num = 4) {
        var result = [];
        for (var i = 0; i < num; i++) {
            var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
            //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
            result.push(String.fromCharCode(65 + ranNum));
        }
        return result.join('');
    },

    /**
     * 加密
     * @returns 
     */
    MD5(...strs) {
        if (validator.isEmpty(strs)) {
            throw "MD5加密数据不能为空";
        }
        let deStr = "";
        for (let i = 0; i < strs.length; i++) {
            deStr = deStr + strs[i];
        }
        return CryptoJS.MD5(deStr).toString().toUpperCase();
    },

    /**
     * 加密
     * @returns 
     */
    SHA1(...strs) {
        if (validator.isEmpty(strs)) {
            throw "SHA1加密数据不能为空";
        }
        let deStr = "";
        for (let i = 0; i < strs.length; i++) {
            deStr = deStr + strs[i];
        }
        return CryptoJS.SHA1(deStr).toString();
    },

    post(option) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        return new Promise((resolve, reject) => {
            request.post(option, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
            });
        });
    }
}

module.exports = tools;