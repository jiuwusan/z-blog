import { createApp } from "vue"

export default (pendComponent, prefix) => {

    let nId = 1
    return {
        install: function (app) {
            let globalComponent = createApp(pendComponent);
            //创建节点
            let div = document.createElement("div");
            let createId = `extendComponent-${prefix}-${nId++}`;
            div.id = createId;
            document.body.appendChild(div);
            //挂载组件
            let pendInstance = globalComponent.mount("#" + createId);
            app.config.globalProperties["$" + prefix] = pendInstance;
            // // 全局注册
            // app.component(prefix, pendComponent);
            // // 两种全局挂载方法
            // app.config.globalProperties["$" + prefix] = pendComponent;
        }
    }
};

