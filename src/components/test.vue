<template lang="html">
  <div>
      {{'名称：' + name}}
      {{'价格：' + price}}
      <button @click="addOne">加一</button>
      <button @click="minusOne">减一</button>
  </div>
</template>

<script>
export default{
  data () {
    return {
      name: '苹果',
      price: 5
    }
  },
  methods: {
    addOne () {
      this.$store.dispatch('increase', this.price)
    },
    minusOne () {
      this.$store.dispatch('decrease', this.price)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
