/**
 * 判断是否为空
 * @param {*} val 
 * @returns 
 */
const isEmpty = (val) => {
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
}

/**
  * 格式化时间
  * fmt: yyyy-MM-dd hh:mm:ss
  */
const formatTime = (datetime, fmt) => {
    let date = new Date();
    if (!isEmpty(datetime)) {
        let timeType = Object.prototype.toString.call(datetime);
        if (timeType === "[object String]" || timeType === "[object Number]") {
            (timeType === "[object String]") && (datetime = datetime.replace(/-/g, "/"));
            date = new Date(datetime);
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
}

/** 
 * 节流函数
*/
function throttle(fn, wait) {
    // 上一次执行时间
    let previous = 0;
    return function (...args) {
        // 当前时间
        let now = +new Date();
        if (now - previous > wait) {
            previous = now;
            fn.apply(this, args);
        }
    }
}

/**
   * @desc 函数防抖
   * @param func 目标函数
   * @param wait 延迟执行毫秒数
   * @param immediate true - 立即执行， false - 延迟执行
   */
function debounce(fn, wait = 200, immediate) {
    let timer = null;
    return function (...args) {
        // 立即执行的功能（timer为空表示首次触发）
        if (immediate && !timer) {
            fn.apply(this, args);
        }

        // 有新的触发，则把定时器清空
        timer && clearTimeout(timer);
        // 重新计时
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    }
}

/**
 * 深度合并JSON
 * 遇到相同元素级属性，以（minor）为准 // 不返还新Object，而是main改变
 * @param {*} minor 
 * @param {*} main 
 */
function objectDeepMerge(minor, main) {
    for (var key in minor) {
        if (main[key] === undefined) { // 不冲突的，直接赋值 
            main[key] = minor[key];
            continue;
        }
        // 冲突了，如果是Object，看看有么有不冲突的属性
        // 不是Object 则以（minor）为准为主，
        let target = minor[key];
        if ((typeof target == "object" && target.constructor == Object) || (Object.prototype.toString.call(target) == '[object Array]')) { // arguments.callee 递归调用，并且与函数名解耦 
            //arguments.callee(minor[key], main[key]);
            objectDeepMerge(minor[key], main[key]);
        } else {
            main[key] = minor[key];
        }
    }
}

/**
 * 克隆
 * @param {*} jsondata 
 */
function cloneData(jsondata, defaultdata) {
    if (!jsondata) {
        return defaultdata || {};
    }
    return JSON.parse(JSON.stringify(jsondata));
}


export {
    isEmpty,
    formatTime,
    throttle,
    debounce,
    objectDeepMerge,
    cloneData
}

export default {
    isEmpty,
    formatTime,
    throttle,
    debounce,
    objectDeepMerge,
    cloneData
}