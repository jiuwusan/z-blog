export default [
    {
        path: '/login',
        component: '@/pages/Auth/Login',
    },
    {
        component: '@/base/MainLayout',
        routes: [
            {
                path: '/',
                component: '@/pages/Sysedit',
            },
            {
                path: '/sysedit',
                component: '@/pages/Sysedit',
            },
            {
                path: '/article',
                component: '@/pages/Article',
            },
            {
                path: '/classify',
                component: '@/pages/ArticleClassify',
            },
            {
                path: '/label',
                component: '@/pages/ArticleLabel',
            },
            {
                path: '/diary',
                component: '@/pages/Diary',
            },
            {
                path: '/link',
                component: '@/pages/Link',
            },
            {
                path: '/message',
                component: '@/pages/Message',
            },
            {
                path: '/editor',
                component: '@/pages/Main',
            },
            {
                path: '/resume',
                component: '@/pages/Resume',
            },
        ],
    },
];
