import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
// import Hello from '@/components/Hello'
import index from '@/components/index'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    children: [{
        path: '/studio',
        component: index
      },
      // { path: '/studio', redirect: { path:'/', hash: '?part=who#studio' }}
      //     // UserProfile will be rendered inside User's <router-view>
      //     // when /user/:id/profile is matched
      //     path: 'profile',
      //     component: index
      //   },
      //   {
      //     // UserPosts will be rendered inside User's <router-view>
      //     // when /user/:id/posts is matched
      //     path: 'posts',
      //     component: index
      //   }
    ]
  }],
  // scrollBehavior (to, from, savedPosition) {
  //   return savedPosition
  // }
})
