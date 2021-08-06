import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Smage from "@/components/Smage";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import { directive } from "@jws";
const { scrollshow, highlight } = directive;
const app = createApp(App);
//全局挂载组件
app.component('Smage', Smage);
app.component('Icon', Icon);
app.component('Logo', Logo);
app.component('Menu', Menu);
//自定义指令
app.directive('scrollshow', scrollshow);
app.directive('highlight', highlight);
//路由
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    window.pageYOffset = 0;
    next();
});
//挂载路由
app.use(store).use(router).mount('#app');
