<template>
    <div class="layout">
        <!-- 导航头部 -->
    <LayoutHeader></LayoutHeader>
        <!-- 内容 -->
    <Content>
        <Sidebar slot="left"></Sidebar>
        <router-view slot="content"></router-view>
    </Content>
    </div>
</template>

<script lang="ts"> 
//装饰器对现有函数或类进行扩展或补充
import {Component,Vue} from 'vue-property-decorator'
import LayoutHeader from "./layoutHeader.vue";
import Content from "./content.vue";
import Sidebar from "./saidbar.vue";


@Component({
    components:{LayoutHeader,Content,Sidebar}
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout{
    width:100%;
    height: 100%;
    margin: 0 auto;
    background: #f5f7f9;
}
</style>
