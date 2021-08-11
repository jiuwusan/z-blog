import { useState } from 'react';

//菜单数据
const menusDefault = [{
    name: "系统配置",
    route: "/sysedit"
}, {
    name: "日记管理",
    route: "/diary"
}, {
    name: "文章管理",
    route: "/article_sub",
    children: [
        {
            name: "文章列表",
            route: "/article",
        },
        {
            name: "文章分类",
            route: "/classify",
        },
        {
            name: "文章标签",
            route: "/label",
        }
    ]
}, {
    name: "友链管理",
    route: "/link"
}, {
    name: "留言管理",
    route: "/message"
}];

export default () => {
    let [menus, setMenus] = useState(menusDefault);
    let [activeKeys, setActiveKeys] = useState({ openKeys: [], selectedKeys: [] });
    return [menus, activeKeys, setMenus, setActiveKeys];
};
