<template>
    <div class="layout">
        <el-container>
                <Aside />
            <el-container>
                <el-header>
                    <Header/>
                </el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <component :is="Component" v-if="flag"/>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import Aside from './aside/Aside.vue';
import Header from './header/Header.vue';
import { useHeaderStore } from '@/store/useHeaderStore';
import { storeToRefs } from 'pinia';

//从pinia中拿到路由刷新的数据
const { refresh } = storeToRefs(useHeaderStore())

//二级路由的状态数据
const flag = ref<boolean>(true)

watch(() => refresh.value, () => {
    flag.value = false
    nextTick(() => {
        flag.value = true
    })
})
</script>

<style lang="scss" scoped>
.layout {
    height: 100vh;

    .el-container {
        height: 100%;

        .el-header {
            height: $base-header-height;
            box-shadow: 5px 5px 5px lightgray;
            // background-color: $base-header-bgcolor;
        }
    }

    .fade-enter-from {
        opacity: 0;
    }

    .fade-enter-active{
        transition: all 0.7s;
    }

    .fade-enter-to {
        opacity: 1;
    }
}
</style>