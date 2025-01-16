<template>
    <div class="header-right">
        <el-button icon="Refresh" circle @click="Refresh"></el-button>
        <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button icon="Setting" circle></el-button>
        <el-dropdown :hide-on-click="false">
            <div class="right-drop">
                <img src="@/assets/images/tx.jpg" />
                <span>admin</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click=loginOut>退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useHeaderStore } from '@/store/useHeaderStore';
import { useUserStore } from '@/store/useUserStore';
import { useRoute, useRouter } from 'vue-router';

//当前路由,和路由实例
const route = useRoute()
const router = useRouter()

//从pinia拿到刷新路由,退出用户信息的方法
const { changeRefresh, deleBread } = useHeaderStore()
const { deleUser } = useUserStore()

//刷新路由方法
const Refresh = () => {
    changeRefresh()
}

//全屏模式切换
const fullScreen = () => {
    //判断当前屏幕状态
    const full = document.fullscreenElement
    if(!full) {
        document.documentElement.requestFullscreen() //切换全屏
    } else {
        document.exitFullscreen() //退出全屏
    }
}

//退出登录
const loginOut = () => {
    deleUser()
    deleBread()
    router.push({name: 'login', query: {rediect: route.path}})
}
</script>

<style lang="scss" scoped>
.header-right {
    display: flex;

    .el-button {
        border: 1px solid lightblue;
    }

    .right-drop {
        margin-left: 20px;
        display: flex;
        align-items: center;
        gap: 20px;

        img {
            width: 32px;
            border-radius: 50%;
        }
    }
}
</style>