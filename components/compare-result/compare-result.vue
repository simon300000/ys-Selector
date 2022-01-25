<template>
  <view width="1024px">排行
    <view v-for="characters, i in seq" :key="i">
      <uni-row >
        <uni-col :span="2">{{ i }}</uni-col>
        <uni-col :span="8" v-for="c in characters" :key="c.id">
          <uni-card :title="c" :cover="'/static/小图/'+c+'.png'">
            
          </uni-card>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>

<script>
  export default {
    name:"compare-result",
    data() {
      return {
        
      };
    },
    computed: {
      seq() {
        return this.$store.state.seq
      }
    }
  }
</script>

<style>

</style>
