import { useState } from 'react';
import { AppstoreOutlined, CameraOutlined, SettingOutlined, FileTextOutlined, BarsOutlined, PushpinOutlined, ShareAltOutlined, CommentOutlined } from '@ant-design/icons';
//菜单数据
const menusDefault = [{
    name: "系统配置",
    route: "/sysedit",
    icon: <SettingOutlined />
}, {
    name: "日记管理",
    route: "/diary",
    icon: <CameraOutlined />
}, {
    name: "文章管理",
    route: "/article_sub",
    icon: <FileTextOutlined />,
    children: [
        {
            name: "文章列表",
            route: "/article",
            icon: <BarsOutlined />
        },
        {
            name: "文章分类",
            route: "/classify",
            icon: <AppstoreOutlined />
        },
        {
            name: "文章标签",
            route: "/label",
            icon: <PushpinOutlined />
        }
    ]
}, {
    name: "友链管理",
    route: "/link",
    icon: <ShareAltOutlined />
}, {
    name: "留言管理",
    route: "/message",
    icon: <CommentOutlined />
}, {
    name: "个人简历",
    route: "/resume",
    icon: <CommentOutlined />
}];

export default () => {
    let [menus, setMenus] = useState(menusDefault);
    let [activeKeys, setActiveKeys] = useState({ openKeys: [], selectedKeys: [] });
    return [menus, activeKeys, setMenus, setActiveKeys];
};
