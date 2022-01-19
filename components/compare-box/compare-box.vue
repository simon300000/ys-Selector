<template>
  <view>
    <uni-row class="demo-uni-row" width="100%">
      <uni-col :span="11" id="left">
        <uni-row class="demo-uni-row">
          <uni-col :span="3">
            <uni-row class="set-bottom"><button>置底</button></uni-row>
          </uni-col>
          <uni-col :span="21">
            <uni-card @click="choose('left-box')" id="left-box" :title="challanger" :cover="leftImageUrl"></uni-card>
          </uni-col>
        </uni-row>
      </uni-col>
      <uni-col :span="2" id="middle">
        <button>平</button>
      </uni-col>
      <uni-col :span="11" id="right">
        <uni-row class="demo-uni-row">
          <uni-col :span="21">
            <uni-card :title="challangee" :cover="rightImageUrl"></uni-card>
          </uni-col>
          <uni-col :span="3">
            <uni-row class="set-bottom"><button>置底</button></uni-row>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>
  </view>
</template>

<script>
  //import store from '@/store/index.js'
  export default {
    data() {
      return {
        //characters: this.$store.state.characters
      }
    },
    methods: {
      choose: function (id) {
        console.log(document.getElementById(id))
      },
    },
    computed: {
      characters() {
        return this.$store.state.characters
      },
      challanger() {
        return this.$store.state.challanger
      },
      challangee() {
        return this.$store.state.challangee
      },
      leftImageUrl() {
        return "/static/" + this.$store.state.challanger + ".png"
      },
      rightImageUrl() {
        return "/static/" + this.$store.state.challangee + ".png"
      }
    },
    created() {
      this.$store.commit("initChallanger")
      this.$store.commit("initChallangee")
      this.$store.commit("addToSeq", this.$store.state.characters[1], 0)
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

  .set-bottom {
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
  }
</style>
