<template>
  <view :key="mainKey">
    <uni-row class="demo-uni-row" width="100%">
      <uni-col :xs="24" :sm="24" :md="11" class="choose"  id="left">
        <uni-row class="demo-uni-row">
          <uni-col :span="3">
            <uni-row class="set-bottom"><button @click="setBottom">置底</button></uni-row>
          </uni-col>
          <uni-col :span="21">
            <uni-table emptyText='' :loading="leftLoaded">
              <uni-th class="name">{{ challanger }}</uni-th>
              <uni-tr>
                <image @load="onLoadLeft()" @click="choose('left')" mode="aspectFit" class="image-large" :src="leftImageUrl"></image>
              </uni-tr>
            </uni-table>
            <!--<uni-card @click="choose('left')" :title="challanger" :cover="leftImageUrl"></uni-card>-->
          </uni-col>
        </uni-row>
      </uni-col>
      <uni-col :xs="24" :sm="24" :md="2" id="middle">
        <button @click="choose('tie')">平</button>
        <button @click="revert()">上一页</button>
      </uni-col>
      <uni-col :xs="24" :sm="24" :md="11" id="right">
        <uni-row class="demo-uni-row">
          <uni-col :span="21">
            <uni-table emptyText='' :loading="rightLoaded">
              <uni-th class="name">{{ challangee }}</uni-th>
              <uni-tr>
                <image @load="onLoadRight()" @click="choose('right')" mode="aspectFit" class="image-large" :src="rightImageUrl"></image>
              </uni-tr>
            </uni-table>
            <!--<uni-card @click="choose('right')" :title="challangee" :cover="rightImageUrl"></uni-card>-->
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
        states: [],
        mainKey: 0,
        leftLoaded: true,
        rightLoaded: true
        //characters: this.$store.state.characters
      }
    },
    watch: {
      challanger: function() {
        this.leftLoaded = true
      },
      challangee: function() {
        this.rightLoaded = true
      }
    },
    methods: {
      onLoadLeft: function () {
        this.leftLoaded = false
      },
      onLoadRight: function () {
        this.rightLoaded = false
      },
      choose: function (id) {
        if (this.$store.state.characters.length === 0) {
          alert("排序完成")
          return
        }
        var state = JSON.parse(JSON.stringify(this.$store.state))
        this.states.push(state)
        //console.log(this.states)
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
          //this.states.push(this.$store.state)
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
        //console.log(challangeeIndex)
        //console.log("state:")
        //console.log(this.$store.state)
        //this.states.push(this.$store.state)
        return
      },
      getIndex: function (character) {
        for ( var i=0; i<this.$store.state.seq.length; i++ ) {
          if ( this.$store.state.seq[i][0] === character ) {
            return i
          }
        }
      },
      setBottom() {
        var state = JSON.parse(JSON.stringify(this.$store.state))
        this.states.push(state)
        this.$store.commit("addToBottom", this.challanger)
        this.$store.commit("removeCharacter", this.challanger)
        this.$store.commit("setChallangeeMin", -1)
        this.$store.commit("setChallangeeMax", this.$store.state.seq.length)
        this.$store.commit("setChallanger", this.$store.getters.getChallangerIndex)
      },
      revert() {
        if (this.states.length >= 1) {
          var state = this.states.pop()
          this.$store.replaceState(state)
          this.manKey += 1
          //console.log(state)
          //console.log(this.$store.state)
          //this.$router.go(-1)
        } else {
          alert("已到最底!")
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
        return "/static/大图/" + this.$store.state.challanger + ".jpg"
      },
      rightImageUrl() {
        return "/static/大图/" + this.$store.state.challangee + ".jpg"
      }
    },
    created() {
      this.$store.commit("initChallanger")
      this.$store.commit("initChallangee")
      this.$store.commit("addToSeq", {"character": this.$store.state.characters[1], "index": 0})
      this.$store.commit("removeCharacter", this.$store.state.challangee)
      this.$store.commit("setChallangeeMax", this.$store.state.seq.length)
      //console.log(this.$store.state.seq.length)
      //console.log("state:")
      //console.log(this.$store.state)
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
  },
  .image-large {
    width: 320px;
    height: 320px;
  },
  .set-bottom {
    justify-content: flex-end;
    align-items: flex-end;
    display: flex;
  }
  .name {
    font-size: 24px;
    color: #000000;
  }
  .choose {
    md: 11;
    sm: 24;
    xs: 24;
  }
</style>
