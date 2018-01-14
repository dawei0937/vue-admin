<template lang="html">
  <div class="system_container">
        <el-row :gutter="20">
          <el-col :span="24">
              <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>{{userInfo.sys_account}},欢迎使用自动投注系统</span>
                    </div>
                    <el-row :gutter="20">
                            <el-col :span="6">
                                角色: <el-tag>{{userInfo.sys_role}}</el-tag>
                            </el-col>
                            <el-col :span="6">
                                上次登录时间: <el-tag>{{userInfo.sys_lastLoginTime}}</el-tag>
                            </el-col>
                            <el-col :span="6">
                                上次登录IP: <el-tag>{{userInfo.sys_lastLoginIp}}</el-tag>
                            </el-col>
                    </el-row>
              </el-card>
         </el-col>
        </el-row>
        <!--  -->
        <el-row :gutter="20">
          <el-col :span="12">
              <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>bet365</span>
                      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div class="text item">
                        <el-switch
                          v-model="bet365Switch"
                          active-text="开启爬取"
                          inactive-text="关闭爬取"
                          @change="changeBetSwitch('bet365')"
                          >
                        </el-switch>
                        <p>网址:<a href="https://www.365-777.com" >前往网站</a></p>
                        <p>上次数据抓取时间: 2018-01-10 10:10:10</p>
                    </div>
              </el-card>
         </el-col>
          <el-col :span="12">
              <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>太阳城</span>
                      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div class="text item">
                        <el-switch
                          v-model="sunImSwitch"
                          active-text="开启爬取"
                          inactive-text="关闭爬取"
                          @change="changeBetSwitch('sunIm')"
                          >
                        </el-switch>
                        <p>网址: <a href="https://www.365-777.com">前往网站</a></p>
                        <p>上次数据抓取时间: 2018-01-10 10:10:10</p>
                    </div>
              </el-card>
          </el-col>
        </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return {
            ver: 1.0,
            bet365Switch: true,
            sunImSwitch: true,
            userInfo: {
                sys_account: 'sysadmin',
                sys_lastLoginTime: '2018-01-11 10:00:00',
                sys_lastLoginIp: '192.168.0.99',
                sys_role: '系统管理员'
            }
        }
    },
    methods: {
        changeBetSwitch: function(site){
            console.log(site);
        }
    }
}
</script>

<style lang="css">
.system_container{padding:10px 5px 10px 5px;}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.box-card,
.text {
  font-size: 14px;
}

</style>
