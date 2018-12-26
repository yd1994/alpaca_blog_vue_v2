
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      {
        path: '/index',
        name: 'index',
        component: resolve => require(['pages/app/Index.vue'], resolve)
      },
      {
        path: '/categories/:categoryId/articles',
        name: 'categoryArticle',
        component: resolve => require(['pages/app/Index.vue'], resolve),
        props: true
      },
      {
        path: '/about',
        name: 'about',
        component: resolve => require(['pages/app/About.vue'], resolve)
      }
    ]
  },
  {
    path: '/articles/:articleId',
    component: () => import('layouts/ArticleLayout.vue'),
    children: [
      {
        path: '',
        component: resolve => require(['pages/app/Article.vue'], resolve),
        props: true
      }
    ]
  },
  {
    path: '/admin',
    component: resolve => require(['layouts/AdminLayout.vue'], resolve),
    redirect: '/admin/outline',
    children: [
      {
        path: '/admin/login',
        name: 'login',
        component: resolve => require(['pages/admin/AdminLogin.vue'], resolve)
      },
      {
        path: '/admin/outline',
        name: 'outline',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/console/Outline.vue'], resolve)
      },
      {
        path: '/admin/write/article',
        name: 'WriteArticle',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/write/WriteArticle.vue'], resolve)
      },
      {
        path: '/admin/write/article/:articleId',
        name: 'UpdateArticle',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/write/WriteArticle.vue'], resolve),
        props: true
      },
      {
        path: '/admin/management/article',
        name: 'ArticleManagement',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/management/ArticleManagement.vue'], resolve)
      },
      {
        path: '/admin/management/category',
        name: 'categoryManagement',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/management/CategoryManagement.vue'], resolve)
      },
      {
        path: '/admin/management/articleTag',
        name: 'articleTagManagement',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/management/ArticleTagManagement.vue'], resolve)
      },
      {
        path: '/admin/person/updatePassword',
        name: 'updatePassword',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/person/UpdatePassword.vue'], resolve)
      },
      {
        path: '/admin/option/general',
        name: 'optionGeneral',
        meta: { requiresAuth: true },
        component: resolve => require(['pages/admin/option/OptionGeneral.vue'], resolve)
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
