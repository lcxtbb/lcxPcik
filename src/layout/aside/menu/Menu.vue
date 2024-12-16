<template>
    <template v-for="(item, index) in routes" :key="index">
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="toPath(item)">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children?.length === 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.meta.hidden" @click="toPath(item.children[0])">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu :index="item.path" v-if="!item.meta.hidden">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :routes="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
import { BreadType, useHeaderStore } from '@/store/useHeaderStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//接收参数，以递归调用
defineProps(['routes'])

//从pinia中拿到改变面包屑的方法
const { changeBread } = useHeaderStore()

//获得路由实例,当前路由实例
const router = useRouter()
const route = useRoute()

//跳转页面,添加面包屑
const toPath = (val: any) => {
    // console.log(val)

    router.push(val.path) //路由跳转
    changeBread({
        ...val.meta,
        path: val.path
    }) //添加面包屑数据
}

//生命周期
onMounted(() => {
    // console.log(route.meta)
    changeBread({
        ...route.meta,
        path: route.fullPath
    } as BreadType)
    
})
</script>

<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped>
.icon {
    width: 18px;
    margin-right: 10px;
}
</style>