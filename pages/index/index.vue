<template>
	<view class="content">
    <view>
      <h1>原神角色喜好排序工具</h1>
      <compare-box v-if="cbv"></compare-box>
      <compare-result v-if="crv"></compare-result>
    </view>
	</view>
</template>

<script>
  import store from '@/store/index.js'
  //import compareBox from '@/components/compare-box/compare-box.vue'
	export default {
		data() {
			return {
				characters: store.state.characters
			}
		},
    computed: {
      cbv() {
        return store.state.compareBoxVisible
      },
      crv() {
        return store.state.compareResultVisible
      }
    },
    watch: {
      characters: function () {
        if (store.state.characters.length === 0) {
          //store.commit("setCompareBoxVisible", false)
          //store.commit("setCompareResultVisible", true)
        }
      }
    },
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	},
  h1 {
    text-align: center;
    background-color: #D9D9D9;
  }

</style>
