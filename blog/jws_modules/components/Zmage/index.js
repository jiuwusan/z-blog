import { createVNode, render, isVNode } from 'vue';
import zmageConstructor from './Main.vue';

let msgIndex = 999999;
const Zmage = (options = {}) => {
    const id = 'jws_zmage_' + (msgIndex++);
    // const userOnClose = options.onClose;
    options = {
        ...options,
        id,
        zIndex: msgIndex++,
    }

    const container = document.createElement('div');

    //创建dom节点
    const vm = createVNode(
        zmageConstructor,
        options,
        isVNode(options.description)
            ? {
                default: () => options.description,
            }
            : null,
    )

    //清除节点，防止内存泄漏
    vm.props.onDestroy = () => {
        console.log("##销毁zmage##");
        render(null, container);
    }

    //当 close 函数被调用时，实例将删除此项
    render(vm, container);
    //挂载
    let zmageBox = document.getElementById("jwszmageBox");
    if (!zmageBox) {
        zmageBox = document.createElement('div');
        zmageBox.id = "jwszmageBox";
        document.body.appendChild(zmageBox);
    }
    zmageBox.appendChild(container.firstElementChild);

    return {
        // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
        // for out component, so that all closing steps will not be skipped.
        close: () => {
            vm.component.proxy.visible = false
        },
    }
}

Zmage.show = (path) => {
    return Zmage({
        path
    });
};

export default Zmage;