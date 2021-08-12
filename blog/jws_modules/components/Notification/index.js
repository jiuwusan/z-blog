import { createVNode, render, isVNode } from 'vue';
import NotificationConstructor from './Main.vue';

let msgIndex = 999999;
const Notification = (options = {}) => {
    const id = 'jws_notification_' + (msgIndex++);
    // const userOnClose = options.onClose;
    options = {
        ...options,
        onClose: () => {
            console.log("关闭");
        },
        id,
        zIndex: msgIndex++,
    }

    const container = document.createElement('div');

    //创建dom节点
    const vm = createVNode(
        NotificationConstructor,
        options,
        isVNode(options.description)
            ? {
                default: () => options.description,
            }
            : null,
    )

    //清除节点，防止内存泄漏
    vm.props.onDestroy = () => {
        console.log("##销毁Notification##");
        render(null, container);
    }

    //当 close 函数被调用时，实例将删除此项
    render(vm, container);
    //挂载
    let notificationBox = document.getElementById("jwsNotificationBox");
    if (!notificationBox) {
        notificationBox = document.createElement('div');
        notificationBox.id = "jwsNotificationBox";
        notificationBox.style = `position: fixed;top: 50px;right: 50px;z-index: 9999999999999999999999999999999999999999999;`;
        document.body.appendChild(notificationBox);
    }
    notificationBox.appendChild(container.firstElementChild);

    return {
        // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
        // for out component, so that all closing steps will not be skipped.
        close: () => {
            vm.component.proxy.visible = false
        },
    }
}

['success', 'warning', 'info', 'error'].forEach(type => {
    Notification[type] = (description = "", title = "系统提示", duration = 3000) => {
        return Notification({
            type,
            description,
            title,
            duration
        });
    };
});

export default Notification