import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '自述文件' },
    children: [
      {
        path: '/Info',
        component: () => import('@/views/InfoPage.vue'),
        meta: { title: 'Info' }
      },
      {
        path: '/song',
        component: () => import('@/views/SongPage.vue'),
        meta: { title: 'Song' }
      },
      {
        path: '/Singer',
        component: () => import('@/views/SingerPage.vue'),
        meta: { title: 'Singer' }
      },
      {
        path: '/SongList',
        component: () => import('@/views/SongListPage.vue'),
        meta: { title: 'SongList' }
      },
      {
        path: '/ListSong',
        component: () => import('@/views/ListSongPage.vue'),
        meta: { title: 'ListSong' }
      },
      {
        path: '/Comment',
        component: () => import('@/views/CommentPage.vue'),
        meta: { title: 'Comment' }
      },
      {
        path: '/Consumer',
        component: () => import('@/views/ConsumerPage.vue'),
        meta: { title: 'Consumer' }
      },
      {
        path: '/Collect',
        component: () => import('@/views/CollectPage.vue'),
        meta: { title: 'Collect' }
      },
      {
        path: '/Test',
        component:() => import('@/views/Test'),
        meta: { title: 'Test'}
      },
      {
        path: '/Infotwo',
        component:() => import('@/views/Infotwo'),
        meta: {title: 'Infotwo'}
      },
      {
        path: '/Table',
        component:() => import('@/views/Table'),
        meta: {title: 'Table'}
      },
      {
        path: '/TableTwo',
        component:() => import('@/views/TableTwo'),
        meta: {title: 'TableTwo'}
      },
      {
        path: '/ProductBook',
        component:() => import('@/views/ProductBook'),
        meta: {title: 'ProductBook'}
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
