<template lang="html">
  <div>
      {{'名称：' + name}}
      {{'价格：' + price}}
      <button @click="addOne">加一</button>
      <button @click="minusOne">减一</button>
      <br/><br/><br/>
      <select v-model="site">
        <option value="Google http://www.google.com">Google http://www.google.com</option>
        <option value="baidu http://www.baidu.co">baidu http://www.baidu.com</option>
        <option value="网易 http://www.163.com">网易 http://www.163.com</option>
      </select>
      <p>name：{{nameURL}}</p>
      <p>url：{{url}}</p>
  </div>
</template>

<script>
export default{
  data () {
    return {
      name: '苹果',
      price: 5,
      nameURL: 'Google',
      url: 'http://www.google.com'
    }
  },
  methods: {
    addOne () {
      this.$store.dispatch('increase', this.price)
    },
    minusOne () {
      this.$store.dispatch('decrease', this.price)
    }
  },
  computed: {
    site: {
      // getter
      get: function () {
        return this.nameURL + ' ' + this.url
      },
      // setter
      set: function (newValue) {
        let names = newValue.split(' ')
        this.nameURL = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
