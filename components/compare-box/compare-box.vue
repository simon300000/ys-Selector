<template>
  <view>
    <uni-row class="demo-uni-row" width="100%">
      <uni-col :span="11" id="left">
        <uni-row class="demo-uni-row">
          <uni-col :span="3">
            <uni-row class="set-bottom"><button>置底</button></uni-row>
          </uni-col>
          <uni-col :span="21">
            <uni-card @click="choose('left')" :title="challanger" :cover="leftImageUrl"></uni-card>
          </uni-col>
        </uni-row>
      </uni-col>
      <uni-col :span="2" id="middle">
        <button @click="choose('tie')">平</button>
      </uni-col>
      <uni-col :span="11" id="right">
        <uni-row class="demo-uni-row">
          <uni-col :span="21">
            <uni-card @click="choose('right')" :title="challangee" :cover="rightImageUrl"></uni-card>
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
        if (this.$store.state.characters.length === 0) {
          alert("排序完成")
          return
        }
        if ( id === 'left' ) {
          //console.log(this.challanger)
          var challangeeIndex = this.getIndex(this.challangee)
          this.$store.commit("setChallangeeMax", challangeeIndex)
          challangeeIndex = Math.round((challangeeIndex + this.$store.state.challangeeMin)/2)
          this.$store.commit("setChallangee", challangeeIndex)
        } else if ( id === 'right' ) {
          //console.log(this.challangee)
          var challangeeIndex = this.getIndex(this.challangee)
          this.$store.commit("setChallangeeMin", challangeeIndex)
          challangeeIndex = Math.round((challangeeIndex + this.$store.state.challangeeMax)/2)
        } else if ( id === 'tie' ) {
          for ( var i=0; i<this.$store.state.seq.length; i++ ) {
            if ( this.$store.state.seq[i][0] === this.challangee ) {
              //console.log(i)
              this.$store.commit("addToSeqTie", {"character": this.challanger, "index": i})
              break
            }
          }
          
          
          this.$store.commit("removeCharacter", this.challanger)
          this.$store.commit("setChallangeeMin", -1)
          this.$store.commit("setChallangeeMax", this.$store.state.seq.length)
          var challangeeIndex = Math.round((this.$store.state.challangeeMin + this.$store.state.challangeeMax)/2)
          this.$store.commit("setChallangee", challangeeIndex)
          this.$store.commit("setChallanger", this.$store.getters.getChallangerIndex)
          return
          
        }
        if ( challangeeIndex === this.$store.state.challangeeMin || challangeeIndex === this.$store.state.challangeeMax ) {
          this.$store.commit("addToSeq", {"index": this.$store.state.challangeeMax, "character": this.challanger})
          this.$store.commit("removeCharacter", this.challanger)
          this.$store.commit("setChallangeeMin", -1)
          this.$store.commit("setChallangeeMax", this.$store.state.seq.length)
          var challangeeIndex = Math.round((this.$store.state.challangeeMin + this.$store.state.challangeeMax)/2)
          this.$store.commit("setChallangee", challangeeIndex)
          this.$store.commit("setChallanger", this.$store.getters.getChallangerIndex)
        } else {
          this.$store.commit("setChallangee", challangeeIndex)
        }
        console.log(challangeeIndex)
        console.log("state:")
        console.log(this.$store.state)
        return
      },
      getIndex: function (character) {
        for ( var i=0; i<this.$store.state.seq.length; i++ ) {
          if ( this.$store.state.seq[i][0] === character ) {
            return i
          }
        }
      }
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
        return "/static/大图/" + this.$store.state.challanger + ".png"
      },
      rightImageUrl() {
        return "/static/大图/" + this.$store.state.challangee + ".png"
      }
    },
    created() {
      this.$store.commit("initChallanger")
      this.$store.commit("initChallangee")
      this.$store.commit("addToSeq", {"character": this.$store.state.characters[1], "index": 0})
      this.$store.commit("removeCharacter", this.$store.state.challangee)
      this.$store.commit("setChallangeeMax", this.$store.state.seq.length)
      //console.log(this.$store.state.seq.length)
      console.log("state:")
      console.log(this.$store.state)
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
