import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Resume from '@/views/Resume'
import Article from '@/views/Article'
import ArticleDetail from '@/views/Article/Detail'
import Message from '@/views/Message'
import Diary from '@/views/Diary'
import Link from '@/views/Link'

export const routes = [
  {
    path: '/',
    name: 'Home',
    menuName: '首页',
    component: Home,
    visible: true,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
    meta: {
      title: '我的简历'
    }
  },
  {
    path: '/article',
    name: 'Article',
    menuName: '博客',
    component: Article,
    visible: true,
    meta: {
      title: '文章列表'
    }
  },
  {
    path: '/article/detail/:uid',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: {
      title: '阅读全文'
    }
  },
  {
    path: '/message',
    name: 'Message',
    menuName: '留言',
    component: Message,
    visible: true,
    meta: {
      title: '留言板'
    }
  },
  {
    path: '/diary',
    name: 'Diary',
    menuName: '日记',
    component: Diary,
    visible: true,
    meta: {
      title: '日记'
    }
  },
  {
    path: '/link',
    name: 'Link',
    menuName: '友链',
    component: Link,
    visible: true,
    meta: {
      title: '友链'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to?.meta?.title || 'Blog';
  next();
})

export default router;

