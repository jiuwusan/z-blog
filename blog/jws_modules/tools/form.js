import util from './util'
/**
 * 验证表单数据
 * @param {*} formData 
    eg:{
        name: "张三",
        age: 17
    }
 * @param {*} rules
    eg:{
        name: "姓名为必填项",
        age: (val) => {
            if ("验证失败") {
                return '年龄必须大于18岁'
            }
            return false;//返回空，表示验证通过
        }
    }
 */
const validate = (formData = {}, rules) => {
    for (const key in formData) {
        let rule = rules[key];
        if (Object.prototype.toString.call(rule) === "[object String]") {
            //只验证必填
            if (util.isEmpty(formData[key])) {
                throw new Error(rules[key]);
            }
        } else if (typeof rule === "function") {
            //通过方法回调
            let message = rule(formData[key]);
            if (message) {
                throw new Error(message);
            }
        }
    }
};

export default {
    validate
}
