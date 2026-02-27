import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/lists',
    },
    {
      path: '/lists',
      name: 'lists',
      component: () => import('../views/ListsView.vue'),
      children: [
        {
          path: ':id',
          name: 'list-detail',
          component: () => import('../views/ListDetailView.vue'),
        },
      ],
    },
  ],
})

export default router
