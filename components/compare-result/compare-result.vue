<template>
  <view>
    <h1>排行</h1>
    <uni-row v-for="characters, i in top3">
      <h2 :class="'top'+(i+1)">{{ i+1 }}</h2>
      <uni-col v-for="c in characters" :key="c.id" :span="8">
          <image mode="aspectFit" class="image-large" :src="'/static/大图/'+c+'.jpg'"></image>
      </uni-col>
    </uni-row>
    <h2 class="others">{{ top3.length+1 }}+</h2>
    <uni-row>
      <view v-for="characters, i in others" :key="i">
        <!--<view class="row">-->
          <!--<uni-col class="seq" :span="1" v-if="true">{{ i }}</uni-col>-->
            <!---->
          <view v-for="c in characters" :key="c.id">
            <uni-col class="small-image-box" :xs="6" :sm="6" :md="4" :lg="3"><image mode="aspectFit" class="image-small" :src="'/static/小图/'+c+'.jpg'"></image></uni-col>
          </view>
        <!--</view>-->
      </view>
    </uni-row>
    <view>
      <uni-row>
        <text>bottom</text>
        <view v-for="c in bottoms" :key="c.id">
          <uni-col class="small-image-box" :xs="6" :sm="6" :md="4" :lg="3"><image mode="aspectFit" class="image-small" :src="'/static/小图/'+c+'.jpg'"></image></uni-col>
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
      },
      top3() {
        var l = Math.min(3, this.$store.state.seq.length)
        var top3 = []
        for (var i=0; i< l; i++) {
          top3.push(this.$store.state.seq[i])
        }
        return top3
      },
      others() {
        var l = Math.min(3, this.$store.state.seq.length)
        var others = []
        for (var i = l; i<this.$store.state.seq.length; i++) {
          others.push(this.$store.state.seq[i])
        }
        return others
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
  lg: 2;
  md: 3;
  sm: 3;
  xs: 4;
},
.image-small {
  width: 120px;
  height: 120px;
},
h1 {
  text-align: center;
  background-color: #D9D9D9;
},
.top {
  text-align: center;
  background-color: #DD524D;
},
.others {
  text-align: center;
  background-color: #007AFF;
}
.seq {
  font-size: 24px;
  color: #0066CC;
},
  .image-large {
    width: 320px;
    height: 320px;
  }
  .top1 {
    text-align: center;
    background-color: #CE3C39
  },
  .top2 {
    text-align: center;
    background-color: #E96900
  },
  .top3 {
    text-align: center;
    background-color: #00CE47;
  }
</style>
