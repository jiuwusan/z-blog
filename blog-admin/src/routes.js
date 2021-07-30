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
            }
        ],
    },
];
