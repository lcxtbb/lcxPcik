<template>
    <div class="header-left">
        <el-icon @click="changeAside">
            <component :is="isColl ? 'Fold' : 'Expand'"></component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in bread" :key="index">
                <div class="bread">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <p @click="toDetail(item.path)">{{ item.title }}</p>
                </div>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { useHeaderStore } from '@/store/useHeaderStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
// import { ref } from 'vue';


//路由实例
const router = useRouter()

//从pinia拿到折叠菜单的数据和方法，面包屑的数据
const { isColl, bread } = storeToRefs(useHeaderStore())
const { changeColl } = useHeaderStore()

//改变左侧折叠菜单
const changeAside = () => {
    changeColl()
}

//面包屑跳转路由
const toDetail = (val: string) => {
    // console.log(val)
    router.push(val)
}
</script>

<style lang="scss" scoped>
.header-left {
    display: flex;
    gap: 20px;

    .bread {
        display: flex;
        align-items: center;
        gap: 5px;
    }
}
</style>