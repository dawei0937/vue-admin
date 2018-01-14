<template lang="html">
    <div class="HOME">
        <commonHeaderV></commonHeaderV>
        <commonContentV></commonContentV>
         <!-- <img src="./assets/logo.png">
         <router-view/> -->
    </div>
</template>

<script>
import commonHeaderV from '@/components/header/header'
import commonContentV from '@/components/content/content'

export default {
    data: function(){
        return{
            active: true,
        }
    },
    components: { commonHeaderV,commonContentV }
}
</script>

<style lang="css">
</style>
