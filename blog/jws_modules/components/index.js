import extendComponent from "./extendComponent";
import Popup from "./Popup";
import NotificationOriginal from "./Notification";
import RichEditor from "./RichEditor";
const Notification = extendComponent(NotificationOriginal, "notification");

export {
    Popup,
    Notification,
    RichEditor
}

export default {
    Popup,
    Notification,
    RichEditor
}
