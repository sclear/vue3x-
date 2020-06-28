<template>
  <div id="app">
    <div class="click" @click="changeNiceText">changeNiceText</div>
    <router-view :nice='data' />
  </div>
</template>
<script>
// nice字段传递参数( 仅仅测试props为方便,勿采用routerView传递 )
// 为了兼顾更完善的类型推导,将不再原型注入。Api的使用应按需要导入
// setup : 所有逻辑data watcher computed ... 形成一个闭包
//       : 参数(props, context),也在为了更好的类型推导做出牺牲，this在setup中将不可用, context是可解构的,不必担心无法响应 { attrs }
//       : 该开发模式下须更多的自我克制面条代码的生产,提升上限的同时也降低了下限
//       : 返回值为了更好描述建议手动返回需要的项目,后期或许会有定制的babel
import { ref } from 'vue'
export default {
  setup () {
    const data = ref('不知道')

    function changeNiceText () {
      data.value = data.value + '1'
    }
    return {
      data,
      changeNiceText
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.click{
 color: #C26C6B;
}
</style>
