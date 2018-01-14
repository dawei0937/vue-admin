<template lang="html">
    <div id="v-container">
        <main>
             <div class="main-left">
               <!--
                    左侧导航,根据顶部导航点击渲染
               -->
               <el-menu :default-active="default_active" class="el-menu-vertical-demo" :router="true">
                 <el-menu-item
                    v-for="leftMenu in leftMenus"
                    :class="{'isActive':active}"
                    :key="leftMenu.path"
                    :index="leftMenu.path"
                 >
                     {{leftMenu.text}}
                 </el-menu-item>
               </el-menu>
             </div>
             <ContendRight></ContendRight>
         </main>
    </div>
</template>

<script>
//引入右边内容组件
import ContendRight from './rightContent'
export default {
    name: 'v-content',
    data: function(){
        return {
            active: true,
            default_active: '/',
            hello: 1,
        }
    },
    computed:{
        leftMenus: function(){
          return this.$store.getters.get_left_nav;
        }
    },
    components: {ContendRight}
}
</script>

<style lang="css">
    /* 主内容区 */
    main{    display: -webkit-box;  display: -ms-flexbox;  display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
    main .main-left{text-align: center;width: 200px;float: left;}
    main .el-menu{background-color: transparent!important;}
</style>
