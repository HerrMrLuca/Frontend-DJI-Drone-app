import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ERouterName } from '/@/types'
import LiveAgora from '/@/components/livestream-agora.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/' + ERouterName.PROJECT
  },
  // title page
  {
    path: '/' + ERouterName.PROJECT,
    name: ERouterName.PROJECT,
    component: () => import('/@/pages/page-web/index.vue')
  },
  // members, devices
  {
    path: '/' + ERouterName.MAINPAGE,
    name: ERouterName.MAINPAGE,
    component: () => import('/@/pages/page-web/mainpage.vue'),
    redirect: '/' + ERouterName.HOMEPAGE,
    children: [ // note links werden dann für die bottom bar importiert also routen werden dann gelinkt
      {
        path: '/' + ERouterName.HOMEPAGE,
        name: ERouterName.HOMEPAGE,
        component: () => import('/@/pages/page-web/home-view.vue')

      }, {
        path: '/' + ERouterName.LIVESTREAM,
        name: ERouterName.LIVESTREAM,
        component: () => import('/@/pages/page-web/livestream-view.vue'),
        children: [
          {
            path: ERouterName.LIVING,
            name: ERouterName.LIVING,
            components: {
              LiveAgora,
            }
          }
        ]
      },
      {
        path: '/' + ERouterName.PROFILE,
        name: ERouterName.PROFILE,
        component: () => import('/@/pages/page-web/profile-view.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
