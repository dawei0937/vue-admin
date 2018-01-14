<template lang="html">
    <div class="systemNotice">
            this counter: {{count}}
    </div>
</template>

<script>
export default {
    name: 'counter',
    computed: {
        count: function(){
           return this.$store.state.count
        }
    },
    data(){
      return {
          counted:2
      }
    }
}
</script>

<style lang="css">
</style>
