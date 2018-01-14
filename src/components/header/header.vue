<template>
    <div class="commonHeader1">
        <header class='header'>
          <el-row>
              <el-col :span="18">
                  <el-menu default-active="/" class="el-menu-demo" mode="horizontal"  :router="true">
                          <el-menu-item
                               v-for="menus in topMenus"
                              :key="menus.index"
                              :index="menus.index"
                              @click="showLeftNav(menus.child)"
                           >
                              {{menus.text}}
                          </el-menu-item>
                  </el-menu>
              </el-col>
              <el-col :span="6" style="line-height:60px">
                      <span>{{username}}</span>
                      <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item></el-dropdown-item>
                              <el-dropdown-item>
                                    <el-button type="primary" size="small">登出</el-button>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                      </el-dropdown>
              </el-col>
          </el-row>
        </header>
    </div>
</template>

<script type="text/javascript">
    export default {
        test: '1',
        name: 'commonHeaderV',
        data: function(){
            return{
                username: 'sysadmin',
                topMenus: [
                    {
                          'index': '/',
                          'text': '首页',
                          'child': [
                                            {'path': '/update','text':   '系统更新'},
                                            {'path': '/notice','text':   '公告信息'},
                                            {'path': '/opRecord','text': '操作记录'},
                                            {'path': '/modify/passwd','text': '密码修改'},
                                   ]
                   },
                   {
                          'index': '/subAccount',
                          'text': '子账号管理',
                          'child': [
                            {
                              'path': '/subAccount',
                              'text': '子账号列表'
                            }
                           ]
                   },
                   {
                          'index': '/member',
                          'text': '会员管理',
                          'child': [
                                      {
                                        'path': '/member',
                                        'text': '会员列表'
                                      },
                                      {
                                        'path': '/member/report',
                                        'text': '会员输赢报表'
                                       }
                                   ]
                   },
                   {
                          'index': '/report',
                          'text': '统计报表',
                          'child': [
                                      {
                                        'path': '/report',
                                        'text': '输赢报表'
                                       }
                                   ]
                   },
                   {
                          'index': '/autoManager',
                          'text': '自动投注管理',
                          'child': [
                                      {
                                        'path': '/autoManager',
                                        'text': '自动投注源'
                                      },
                                      {
                                        'path': '/autoManager/setting',
                                        'text': '自动投注参数设置'
                                       }
                                   ]
                   }
                ]
            }
        },
        methods: {
          showLeftNav: function(e){
              this.$store.dispatch('fetchNavLeft',e)
          }
        },
        computed:{
            set: function(){

            }
        },
        mounted() {
          this.$store.dispatch('fetchNavLeft',[
                        {'path': '/update','text': '系统更新'},
                        {'path': '/notice','text': '公告信息'},
                        {'path': '/opRecord','text': '操作记录'},
                        {'path': '/modify/passwd','text': '密码修改'}
                    ])
        }
}
</script>

<style media="screen">
    /* 头部导航 */
    header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
    header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
    header .el-menu-demo{padding-left: 300px!important;}
</style>
