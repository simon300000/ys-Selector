<template>
  <view>
    <h1>排行</h1>
    <uni-row class="row">
      <view v-for="characters, i in seq" :key="i">
        <!--<view class="row">-->
          <uni-col class="seq" :span="3" v-if="true">{{ i }}</uni-col>
            <!---->
          <view v-for="c in characters" :key="c.id">
            <uni-col :span="3"><image mode="aspectFit" class="image-small" :src="'/static/小图/'+c+'.png'"></image></uni-col>
          </view>
        <!--</view>-->
      </view>
    </uni-row>
    <view>
      <uni-row>
        <uni-col :span="3">bottom</uni-col>
        <view v-for="c in bottoms" :key="c.id">
          <uni-col :span="3"><image mode="aspectFit" class="image-small" :src="'/static/小图/'+c+'.png'"></image></uni-col>
        </view>
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
      },
      bottoms() {
        return this.$store.state.bottom
      }
    }
  }
</script>

<style>
.row {
  display: block;
  flex-wrap: wrap;
},
.small-image-box{
  flex: block;
},
.image-small {
  width: 120px;
},
h1 {
  text-align: center;
  background-color: #D9D9D9;
},
.seq {
  font-size: 24px;
  color: #0066CC;
}
</style>
