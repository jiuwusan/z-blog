//验证工具类
const validator = {
    //取值,过滤多余的参数
    isEmpty(val) {
        // null or undefined
        if (val == null) return true;

        if (typeof val === 'boolean') return false;

        if (typeof val === 'number') return !val;

        if (val instanceof Error) return val.message === '';

        switch (Object.prototype.toString.call(val)) {
            // String or Array
            case '[object String]':
            case '[object Array]':
                return !val.length;

            // Map or Set or File
            case '[object File]':
            case '[object Map]':
            case '[object Set]': {
                return !val.size;
            }
            // Plain Object
            case '[object Object]': {
                return !Object.keys(val).length;
            }
        }

        return false;
    },
    /**
     * 验证数据
     * @param {*} rules 
     * @param {*} formData 
     * @returns 
     */
    validate(rules = {}, formData = {}) {
        //开始验证
        for (const key in rules) {
            let rule = rules[key];
            if (Object.prototype.toString.call(rule) === "[object String]") {
                //只验证必填
                if (validator.isEmpty(formData[key])) {
                    throw rules[key];
                }
            } else if (typeof rule === "function") {
                //通过方法回调
                let message = rule(formData[key]);
                if (message) {
                    throw message;
                }
            }
        }

        return formData;
    }
}

module.exports = validator;