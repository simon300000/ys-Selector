<template>
	<view >test</view>
</template>

<script>
  //import store from '@/store/index.js'
	export default {
		data() {
			return {}
		},
    computed: {
      characters() {
        return this.$store.state.characters
      }
    }
	}
</script>

<style>
</style>
