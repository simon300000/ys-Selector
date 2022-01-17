<template>
	<view>
    <view id="main">
      <view id="left" class="uniui-left">
        <view id="left-l">
          <button>置顶</button>
          <button>置底</button>
        </view>
        <view id="left-r">
          <button>{{ characters[0] }}</button>
        </view>
      </view>
      <view id="right" class="uniui-right">
        <view id="right-l">
          <button>{{ characters[1] }}</button>
        </view>
        <view id="right-r">
          <button>置顶</button>
          <button>置底</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  //import store from '@/store/index.js'
	export default {
		data() {
			return {
        characters: this.$store.state.characters
      }
		},
    computed: {
      // characters() {
      //   return this.$store.state.characters
      // }
    }
	}
</script>

<style>
</style>
