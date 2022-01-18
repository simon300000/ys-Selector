<template>
  <view>
    <uni-row class="demo-uni-row" width="100%">
      <uni-col :span="11" id="left">
        <uni-row class="demo-uni-row">
          <uni-col :span="3">
            <uni-row><button>置顶</button></uni-row>
            <uni-row><button>置底</button></uni-row>
          </uni-col>
          <uni-col :span="21">
            <uni-card :title="characters[0]" :cover="leftImageUrl"></uni-card>
          </uni-col>
        </uni-row>
      </uni-col>
      <uni-col :span="2" id="middle">
        <button>平</button>
      </uni-col>
      <uni-col :span="11" id="right">
        <uni-row class="demo-uni-row">
          <uni-col :span="21">
            <uni-card :title="characters[1]" :cover="rightImageUrl"></uni-card>
          </uni-col>
          <uni-col :span="3">
            <uni-row><button>置顶</button></uni-row>
            <uni-row><button>置底</button></uni-row>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>
  </view>
</template>

<script>
  function compare(event) {
    
  }
  //import store from '@/store/index.js'
  export default {
    data() {
      return {
        //characters: this.$store.state.characters
      }
    },
    computed: {
      characters() {
        return this.$store.state.characters
      },
      leftImageUrl() {
        return "/static/"+this.$store.state.characters[0]+".png"
      },
      rightImageUrl() {
        return "/static/"+this.$store.state.characters[1]+".png"
      }
    }
  }
</script>

<style>
  .demo-uni-row {
      margin-bottom: 10px;
      /* QQ、字节小程序文档写有 :host，但实测不生效 */
      /* 百度小程序没有 :host，需要设置block */
      /* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
      display: block;
      /* #endif */
      justify-content: center;
      align-items: center;
  }
  uni-row {
    
  }
</style>
