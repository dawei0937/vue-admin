import Vue from 'vue'
import Router from 'vue-router'
//HOME
import Home from '../page/home/home'
//login
import Login from '../page/login/login'
//引入组件
import RightContent from '@/components/content/rightContent'
import systemInfo   from '../page/system/systemInfo'
import systemUpdate from '../page/system/systemUpdate'
import systemNotice from '../page/system/systemNotice'
import systemOpList from '../page/system/systemOpList'
//子账号
import subAccountList from '../page/subAccount/subAccountList'
//会员组件
import memberList from '../page/member/memberList'
import systemModifyPw from '../page/member/password'
//报表组件
import reportList from '../page/report/reportList'
//404页面
import page404 from '../page/404/404'



Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
          path: '/404',
          component:page404,
          name: 'page404',
          hidden:true
    },
    {
          path: '/login',
          component: Login,
          name: '',
          hidden: true

    },{ //首页路由
      path: '/',
      component: Home,
      children: [
          {path: '', component: systemInfo},
          {path: 'update', component: systemUpdate},
          {path: 'notice', component: systemNotice},
          {path: 'opRecord', component: systemOpList},
          {path: 'modify/passwd', component: systemModifyPw}
      ]

    },{ //子账号路由
      path: '/subAccount',
      name: 'page_subaccount',
      component: Home,
      children: [
          {path: '', component: subAccountList},
          {path: 'add', component: systemUpdate}
      ]

    },{ //会员管理
      path: '/member',
      name: 'page_member',
      component: Home,
      children: [
          {path: '', component: memberList},
          {path: 'report', component: systemNotice}
      ]

    },{ //报表管理
      path: '/report',
      name: 'page_report',
      component: Home,
      children: [
          {path: '', component: reportList},
      ]
    },{ //自动投注设置
      path: '/autoManager',
      name: 'page_autoManager',
      component: Home,
      children: [
          {path: '', component: reportList},
          {path: 'setting', component: reportList},
      ]
    }
  ]
})
