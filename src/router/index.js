import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
// import Hello from '@/components/Hello'
import index from '@/components/index'

import vueSmoothScroll from 'vue-smoothscroll';
Vue.use(vueSmoothScroll);


Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    // children: [{
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
    // ]
  }]
})
