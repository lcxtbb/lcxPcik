
export const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('@/views/404/NotFound.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'any',
        redirect: '/notfound',
        meta: {
            hidden: true
        }
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/Layout.vue'),
        meta: {
            title: '',
            hidden: false
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/Home.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/Screen.vue'),
        name: 'Screen',
        meta: {
            title: '数据展示',
            hidden: false,
            icon: 'Platform',
        },
    },
    {
        path: '/acl',
        name: 'acl',
        component: () => import('@/layout/Layout.vue'),
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock',
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/aci/user/User.vue'),
                name: 'user',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User',
                },
            },
            {
                path: '/acl/role',
                component: () => import('@/views/aci/role/Role.vue'),
                name: 'role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'Avatar',
                },
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/aci/permission/Permission.vue'),
                name: 'permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'List',
                },
            },
        ],
    },
    {
        path: '/product',
        component: () => import('@/layout/Layout.vue'),
        name: 'product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/Trademark.vue'),
                name: 'trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCart',
                    hidden: false,
                },
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/Attr.vue'),
                name: 'attr',
                meta: {
                    title: '属性管理',
                    icon: 'Management',
                    hidden: false,
                },
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/Spu.vue'),
                name: 'spu',
                meta: {
                    title: 'Spu',
                    icon: 'SetUp',
                    hidden: false,
                },
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/Sku.vue'),
                name: 'sku',
                meta: {
                    title: 'Sku',
                    icon: 'ScaleToOriginal',
                    hidden: false,
                },
            },
        ],
    },
]