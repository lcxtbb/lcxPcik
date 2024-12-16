<template>
    <el-aside :class="isColl ? 'fold' : ''">
        <div class="aside">
            <div class="logo">
                <template v-if="setting.logoShow">
                    <img :src="setting.logoImg" />
                </template>
                <p :hidden="isColl">{{ setting.title }}</p>
            </div>
            <el-scrollbar class="scroll">
                <el-menu background-color="#001529" text-color="#f5f5f5" :default-active="route.path"
                    :collapse="isColl">
                    <Menu :routes="routes" />
                </el-menu>

            </el-scrollbar>
        </div>
    </el-aside>
</template>

<script setup lang="ts">
import setting from '@/setting';
import Menu from './menu/Menu.vue';
import { routes } from '@/router/routes';
import { useRoute } from 'vue-router';
import { useHeaderStore } from '@/store/useHeaderStore';
import { storeToRefs } from 'pinia';

//拿到当前路由
const route = useRoute()

//从pinia拿到折叠状态的数据
const { isColl } = storeToRefs(useHeaderStore())
</script>

<style lang="scss" scoped>
.el-aside {
    width: $base-aside-width;
    background-color: $base-aside-bgcolor;
    transition: all .3s;

    &.fold {
        width: $base-aside-minWidth;
    }

    .aside {

        .logo {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;

            img {
                width: $base-aside-logo;
                height: $base-aside-logo;
                border-radius: 50%;
            }

            p {
                color: $base-aside-title-pcolor;
                font-size: $base-aside-title-p;
            }
        }

        .scroll {
            height: calc(100vh - 60px);

            .el-menu {
                border-right: none;
            }
        }
    }
}
</style>