<template>
  <div class="home">
    {{data.name}},{{nice}}
    <div class="click" @click="changeName">change</div>
    <p>{{text}}</p>
    <p>{{plusMood}}</p>
    <p>{{plusaction}}</p>
  </div>
</template>

<script>
// props       : api依旧保留用户空间依旧是不可变,为了维持组件更好的类型推导3.0未采用原型注入,this使用需谨慎, 使用props时不要解构props,否则将会丢失响应(失去了原有的地址)
// watchEffect : 数据update触发,必然是该作用域中某一个更新非全局。可包含props
// computed    : 手动getter/setter
// readonly    : 只读代理
// watch       : 类似2xwatcher功能,第一个参数可侦听getter | ref，第二个callback。侦听多个参数watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {})
// ref         : 类似reactive Api  ||||||||||||↘↘↘
//                                          选择合适的应用场景，reactive声明对象state,ref声明单个变量。有些许JavaScript中引用类型与基本类型的区别；主要是风格问题
//                                          数据的特殊性:
//                                                      ref声明单个变量,为实现内部响应式原理,必然使用引用类型包裹一层,change时修改声明的.value,而不是声明的该变量。template use时直接使用变量,有处理
//                                                      reactive声明对象state,为了保持Vue的数据响应,切勿对reactive声明的变量使用展开或解构,否则将会失去响应性
//                                                      reactive声明在应对插件生产时,须用到解构,“ toRefs ” Api能够使你获得ref的能力。如何应对↓↓↓↓↓↓↓↓
//                                                                  function useMousePoint() {
//                                                                      const point = reactive({
//                                                                          x: 0,
//                                                                          y: 0
//                                                                      })
//                                                                      return toRefs(point)
//                                                                  }
//                                                                  const { x, y } = useMounsePoint()
// reacttive    : 类似ref Api |||||||||||||||↗↗↗
import { reactive, watchEffect, ref, computed, readonly, onMounted, watch } from 'vue'
export default {
  name: 'Home',
  props: {
    nice: String
  },
  setup (props) {
    // reactive 3.0声明state的方式
    const data = reactive({
      name: '蒋超',
      sex: '🚹'
    })

    // ref 3.0声明state的方式
    console.log(ref)
    const text = ref('refName')

    // watchEffect 追踪依赖,依赖改变时异步触发
    watchEffect((onInvalidate) => {
      console.log(data.name)
      console.log(data.sex)
      // const token = performAsyncOperation()
      console.log(props.nice)
      onInvalidate(() => {
        console.log('clear success')
      })
    })

    // readonly只读的
    const copy = readonly(data.name)

    // 生命周期函数 setup 代替了 before?create(d)?
    // beforeMount
    // mounted
    // beforeUpdate
    // updated
    // beforeDestroy
    // destroyed
    // errorCaptured
    onMounted(() => {
      watchEffect(() => {
        // 此处是可以访问到dom | refs | template
      })
    })

    // watch( ref, callback ) || ( getter, callback )
    watch(() => data.name, (newVal, oldVal) => {
      console.log(newVal)
    })

    // computed 计算属性
    const plusMood = computed(() => data.name + '简直不要太开心')
    const plusaction = computed({
      get: () => data.name + '想要去北京了',
      set: (val) => {
        data.name = val
      }
    })

    function changeName () {
      data.name = data.name + '真的'
    }
    return {
      data,
      changeName,
      text,
      plusMood,
      plusaction,
      copy
    }
  }
}
</script>
