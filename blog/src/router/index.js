import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Article from '@/views/Article'
import Message from '@/views/Message'
import Diary from '@/views/Diary'
import Link from '@/views/Link'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/diary',
    name: 'Diary',
    component: Diary
  },
  {
    path: '/link',
    name: 'Link',
    component: Link
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
