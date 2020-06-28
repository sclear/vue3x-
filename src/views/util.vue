<template>
  <div class="about">
    <h1>Ref:{{ name }}</h1>
    <h1>ReactTive:{{ data.name }}</h1>
    <h1>ReactTive:{{ copydata }}</h1>
    <div @click="changeName" class="click">changeName</div>
    <div @click="changeNames" class="click">changeNames</div>
  </div>
</template>

<script>
// 响应式工具
// toRef       : 可以获得响应能力并可被传递
// toRefs      : 将reactive创建对象转为普通对象，且可被解构内部也拥有响应能力
// isRef       : 检测是否是Ref类型
// isProxy     : 检测是否是 ReacTive | ReadOnly创建的代理对象,ReactTive可包裹ReadOnly
// isReactive  : 检测是否是ReaTive创建的代理对象
// isReadonly  : 检测是否是ReadOnly创建的代理只读对象
import { reactive, toRef, toRefs, isRef, isProxy } from 'vue'
export default {
  setup () {
    const data = reactive({
      name: '蒋超',
      sex: '🚹'
    })

    // toRefs 转普通对象且对象内参数拥有响应能力
    const copydata = toRefs(data)
    console.log(copydata)

    // toRef可以获得响应的能力 可被传递
    const name = toRef(data, 'name')

    // isRef
    console.log(isRef(copydata)) // false
    console.log(isRef(copydata.sex)) // true
    console.log(isRef(name)) // true

    // isProxy
    console.log(isProxy(data))

    function changeName () {
      name.value = '帅帅'
    }
    function changeNames () {
      data.name = '帅帅真是太好了'
    }
    return {
      data,
      name,
      changeName,
      changeNames,
      copydata
    }
  }
}
</script>
