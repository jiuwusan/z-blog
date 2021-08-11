import { createApp } from "vue"

export default (pendComponent, prefix) => {

    let nId = 1
    return {
        install: function (app) {
            let globalComponent = createApp(pendComponent);
            let div = document.createElement("div");
            let createId = `extendComponent-${prefix}-${nId++}`;
            div.id = createId;
            document.body.appendChild(div);
            let pendInstance = globalComponent.mount("#" + createId);
            app.config.globalProperties[`$${prefix}`] = pendInstance;
        }
    }
};

