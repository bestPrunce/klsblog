# vue中优雅的使用echarts

​ 在前端工作中，数据可视化用得最多的，可能就是图表了。在众多的图表插件中，echarts以其良好的性能和完善的API，图表的多样性和功能的完整性，被广大开发者认可，成为了前端图表使用最多的工具。本篇文章主要就是讲下echarts在vue中的使用。

## 第一步，npm 安装 ECharts，可以使用如下命令通过 npm 安装 ECharts

```javaScript
npm install echarts --save
```
然后我们看下大部分人的使用方法，大概像下面这样：

```javaScript
<template>
  <div>
    <div ref="chartColumn" style="width:100%; height:400px;"></div>
    <button @click="changeOption">点击改变内容</button>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chartColumn: null,
      option: {
        title: {
          text: '普通图表'
        },
        legend: {
          orient: 'vertical',
          bottom: 10,
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  methods: {
    changeOption() {
      var r = Math.floor(Math.random() * 12)
      //splice会改变原来的数组
      //var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      this.chartColumn.setOption(this.option)
    },

    initChart() {
      this.chartColumn = echarts.init(this.$refs.chartColumn)
      this.chartColumn.setOption(this.option)
    }
  },
  mounted: function() {
    this.initChart()
  }
}
</script>
```

## 第二步，封装成一个公用组件

上面的代码，虽然功能实现了，也没什么错误，但是需要优化的地方很多。

首先，我们考虑到多个地方需要用到echarts，封装一个组件出来，就像下面这样：

```javaScript
// 组件部分 src/components/Charts/ChartsBlock.vue 路径仅供参考

<template>
  <div ref="chartEl" style="height:100%"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'ChartBlock',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue)
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)
    this.chart.setOption(this.option)    
    // 这里模拟后台请求动态变化的数据，每2S改变一次数据
    setInterval(this.changeOption, 2000)
  },
  methods: {
    changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      console.log(this.option.series[0].data)
    }
  }
}
</script>
```

然后使用：

```javaScript
<template>
    <div>
        <div style="width:100%; height:400px;">
            <chart-block :option="option"></chart-block>
        </div>
    </div>
</template>
<script>
import ChartBlock from '@/components/Charts/ChartsBlock.vue'
export default {
  name: 'xxxxx',
  components: {
    ChartBlock
  },
  data() {
    return {      
      option: {
        title: {
          text: '普通图表'
        },
        legend: {
          orient: 'vertical',
          bottom: 10,
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  }
}
</script>
```

和之前的比起来，我们看看封装后的组件做了什么：

1、不用给每个图表指定ref属性了

2、不用定义图表变量了

​ （1和2在我们同一个页面有多个图表时，减少了很多不必要的变量）

3、不用自己初始化图表了

4、数据改变时，我们自动监听，不需要手动处理了

​（3和4在我们同一个页面有多个图表时，减少了重复逻辑的工作量）

## 第三步，注册为全局组件，减少引用

上面针对的，是同一个页面有多个图表时的优化。接下来，我们继续优化，如果一个组件有多个页面都要用到，我们就该考虑把它注册为全局的，减少引用。代码如下：

```javaScript
<template>
  <div ref="chartEl" style="height:100%"></div>
</template>
<script>
import echarts from 'echarts'
const ChartBlock = {
  name: 'ChartBlock',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      // data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue)
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)
    this.chart.setOption(this.option)
    // setInterval(this.changeOption, 2000)
  },
  methods: {
    /* changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      console.log(this.option.series[0].data)
    } */
  }
}

/* 注册组件的方法 */
ChartBlock.install = (Vue) => {
  Vue.component(ChartBlock.name, ChartBlock)
}
export default ChartBlock
</script>
```
然后在main.js里全局注册

```javaScript
import ChartBlock from '@/components/Charts/ChartsBlock.vue'
Vue.use(ChartBlock)
```

## 第四步，做图表自适应

好了，到这里已经解决了组件的复用性，接下来再做点其他的。很多时候，我们的图表可能都需要跟随窗口进行实时的动态改变，每个组件都单独写，显然不现实，那我们最好的办法，就是把跟随窗口改变的代码直接写在组件里面，需要注意的是，一定要在组件销毁时移除窗口改变的监听。继续完善我们的组件，如下：

```javaScript
const ChartBlock = {
  name: 'ChartBlock',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
      // data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue)
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)
    this.chart.setOption(this.option)
    // setInterval(this.changeOption, 2000)

    // 添加窗口改变监听
    this.chart._resize = () => {
      this.chart.resize()
    }
    window.addEventListener('resize', this.chart._resize)
  },
  methods: {
    /* changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      console.log(this.option.series[0].data)
    } */

  },
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener('resize', this.chart._resize)
  }
}

/* 注册组件的方法 */
ChartBlock.install = Vue => {
  Vue.component(ChartBlock.name, ChartBlock)
}
export default ChartBlock
</script>
```

## 第五步，优化图表自适应，做节流

有了上面的补充，以后再也不用担心图表响应的问题了，只管调用即可。但是，这样就OK了吗？作为一个好（bushitailan）的开发，我们要的可不只是功能，还要考虑性能的问题啊。

第一点：像窗口改变大小这种事件，一旦存在拖动，将发生得太频繁，我们很有必要做一下节流处理（不知道函数节流的，自行了解一下，算是前端必须掌握的基础技能哦）。解决办法，自然就是添加一个节流函数，继续看代码：

```javaScript
<template>
  <div ref="chartEl" style="height:100%"></div>
</template>
<script>
import echarts from 'echarts'
const ChartBlock = {
  name: 'ChartBlock',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
      // data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue)
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)
    this.chart.setOption(this.option)
    // setInterval(this.changeOption, 2000)

    // 添加窗口改变监听,增加节流，每隔200ms执行
    this.chart._resize = this.throttle(() => {
      this.chart.resize()
    }, 200)

    window.addEventListener('resize', this.chart._resize)
  },
  methods: {
    /* changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      console.log(this.option.series[0].data)
    } */

    // 节流函数,来自Lodash，这里可以自己写一个简单点的
    // 如果有多个地方用到，也可以使用引入的方式
    throttle(func, wait, options) {
      let time, context, args
      let previous = 0
      if (!options) options = {}

      const later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        time = null
        func.apply(context, args)
        if (!time) context = args = null
      }

      const throttled = function() {
        const now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        const remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (time) {
            clearTimeout(time)
            time = null
          }
          previous = now
          func.apply(context, args)
          if (!time) context = args = null
        } else if (!time && options.trailing !== false) {
          time = setTimeout(later, remaining)
        }
      }
      return throttled
    }
  },
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener('resize', this.chart._resize)
  }
}

/* 注册组件的方法 */
ChartBlock.install = Vue => {
  Vue.component(ChartBlock.name, ChartBlock)
}
export default ChartBlock
</script>
```
第二点：也是更重要的一点，从vue 的角度出发，我们把图表的 option 写在 data 里，是很浪费性能的。为什么这么说呢，因为 vue 的数据改变监听实质上就是对 data 对象进行逐层循环，为每一个属性添加监听。而我们图表的数据对象，只是我们图表需要的一些配置项，压根不参与业务逻辑，一个简单的对象还好，但复杂的 echarts 图表，一个option 上100个属性，如果一个页面再有多个图表的话，得额外添加多少没用的监听器，可想而知。所以，我的建议是，把 option 数据写到 data 之外，然后通过调用 echarts 的 setOption 方法设置数据。既然如此，那我们就得在chart-block组件里暴露出我们的setOption方法，以供父组件调用了。继续修改代码：

```javaScript
<template>
  <div ref="chartEl" style="height:100%" />
</template>
<script>
import echarts from 'echarts'
const ChartBlock = {
  name: 'ChartBlock',
  /* props: {
    option: {
      type: Object,
      default: () => {}
    }
  }, */
  data() {
    return {
      chart: null
      // data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue)
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)

    // 这里没有option,不在此初始化数据
    // this.chart.setOption(this.option)

    // setInterval(this.changeOption, 2000)

    // 添加窗口改变监听
    this.chart._resize = this.throttle(() => {
      console.log('1212')
      this.chart.resize()
    }, 200)

    window.addEventListener('resize', this.chart._resize)
  },
  methods: {
    /* changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      console.log(this.option.series[0].data)
    } */
    // 去除props,添加methods
    setOption(option) {
      this.chart && this.chart.setOption(option)
    },
    // 节流函数,来自Lodash，这里可以自己写一个简单点的
    // 如果有多个地方用到，也可以使用引入的方式
    throttle(func, wait, options) {
      let time, context, args
      let previous = 0
      if (!options) options = {}

      const later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        time = null
        func.apply(context, args)
        if (!time) context = args = null
      }

      const throttled = function() {
        const now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        const remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (time) {
            clearTimeout(time)
            time = null
          }
          previous = now
          func.apply(context, args)
          if (!time) context = args = null
        } else if (!time && options.trailing !== false) {
          time = setTimeout(later, remaining)
        }
      }
      return throttled
    }
  },
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener('resize', this.chart._resize)
  }
}

/* 注册组件的方法 */
ChartBlock.install = Vue => {
  Vue.component(ChartBlock.name, ChartBlock)
}
export default ChartBlock
</script>
```

这里主要就是改了两处，一处是props的option不要了，还有就是methods里添加了setOption方法，把setOption暴露给父组件调用。同时mounted生命周期中不再做setOption初始化。

然后父组件使用方法如下：

```javaScript
<template>
  <div style="height: 500px;">
    <!-- 多了ref，用于获取该组件调用setOption方法 -->
    <chart-block ref="chart2"></chart-block>
  </div>
</template>

<script>
// 把配置项放在外面
let option2 = {
  title: {
    text: '普通图表'
  },
  legend: {
    orient: 'vertical',
    bottom: 10,
    data: ['销量']
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
export default {
  data() {
    return {}
  },
  // 在父组件的mounted中调用setOption
  mounted() {
    this.$refs.chart2.setOption(option2)
  }
}
</script>
```

## 第六步，按需引入，减少文件体积

echarts在5.0版本以后，按需引入已经可以使用更加优雅方式，具体请参照官方文档，下面旧版本引入仅供参考

最最后一步，就是考虑优化下echarts引入，虽然直接import echarts from 'echarts'没有问题，而且非常省事方便，但会额外的引入其他无用的配置文件，造成应用文件体积过大，资源加载耗时过长，影响用户体验。所以考虑多写几行代码，把echarts按需引入。

首先，先专门设置一个echarts的配置文件，这里具体路径可以参考文章末尾的官方按需引入链接，注意使用import一定要写上完整的路径，代码如下：

```javaScript
// 文件路径 @/util/echarts-config.js 自行配置
// 加载echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default echarts
```

然后在全局组件`EchratsBlock`中，`import echarts from 'echarts'`引入改为`import echarts from '@/utils/echarts-config.js'`，注意根据你的实际文件路径引入。当我们需要使用不同的图表，不同的配置时记得在`echarts-config.js`里引入。

## 完整代码

配置文件`echarts-config.js`

```javaScript
// 文件路径 @/util/echarts-config.js 自行配置
// 加载echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

export default echarts
```

全局组件ChartBlock.vue

```javaScript
<template>
  <div ref="chartEl" style="height:100%" />
</template>
<script>
import echarts from '@/utils/echarts-config.js'
const ChartBlock = {
  name: 'ChartBlock',
  /* props: {
    option: {
      type: Object,
      default: () => {}
    }
  }, */
  data() {
    return {
      chart: null
      // data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.chart.setOption(newValue)
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)

    // 这里没有option,不在此初始化数据
    // this.chart.setOption(this.option)

    // setInterval(this.changeOption, 2000)

    // 添加窗口改变监听
    this.chart._resize = this.throttle(() => {
      console.log('1212')
      this.chart.resize()
    }, 200)

    window.addEventListener('resize', this.chart._resize)
  },
  methods: {
    /* changeOption() {
      var r = Math.floor(Math.random() * 12)
      // splice会改变原来的数组
      // var data = this.data.splice(r,6);
      var d = this.data.slice(r, r + 6)
      this.option.series[0].data = d
      console.log(this.option.series[0].data)
    } */
    // 去除props,添加methods
    setOption(option) {
      this.chart && this.chart.setOption(option)
    },
    // 节流函数,来自Lodash，这里可以自己写一个简单点的
    // 如果有多个地方用到，也可以使用引入的方式
    throttle(func, wait, options) {
      let time, context, args
      let previous = 0
      if (!options) options = {}

      const later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        time = null
        func.apply(context, args)
        if (!time) context = args = null
      }

      const throttled = function() {
        const now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        const remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (time) {
            clearTimeout(time)
            time = null
          }
          previous = now
          func.apply(context, args)
          if (!time) context = args = null
        } else if (!time && options.trailing !== false) {
          time = setTimeout(later, remaining)
        }
      }
      return throttled
    }
  },
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener('resize', this.chart._resize)
  }
}

/* 注册组件的方法 */
ChartBlock.install = Vue => {
  Vue.component(ChartBlock.name, ChartBlock)
}
export default ChartBlock
</script>
```

在页面中使用
```javaScript
<template>
  <div style="height: 500px;">
    <!-- 多了ref，用于获取该组件调用setOption方法 -->
    <chart-block ref="chart2"></chart-block>
  </div>
</template>

<script>
// 把配置项放在外面
let option2 = {
  title: {
    text: '某站点用户访问来源',
    subtext: '纯属虚构',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
export default {
  data() {
    return {}
  },
  // 在父组件的mounted中调用setOption
  mounted() {
    this.$refs.chart2.setOption(option2)
  }
}
</script>

```