<template>
    <div id="login">
        is Login
        <el-button>默认按钮</el-button>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {

        };
    },
    //计算属性computed：不支持异步，依赖的属性的值发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值
    computed: {},

    //侦听属性watch：支持异步,仅仅是数据发生改变的时候会侦听到, 只是会检测到你写在watch里的那些属性,没写的就不会触发
    watch: {},

    //编写的逻辑运算
    methods: {},

    //初始化数据，在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    created() {},

    //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    mounted() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},

    //执行到它的时候时候是数据发生变化且界面更新完毕, 不能监听到路由数据(例如网址中的参数), 所有的数据发生变化都会调用(消耗性能), 每次触发的代码都是同一个
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#login{
    height:100vh;
    background-color: #344a5f;
}
</style>