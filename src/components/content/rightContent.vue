<template lang="html">
    <!-- 右侧主内容区 -->
    <div  class="main-right" >
        <transition name="fade"
                    mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
    .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff; padding: 10px 20px; }

    .fade-enter-active,
    .fade-leave-active {
    	transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
    	opacity: 0;
    }
</style>
