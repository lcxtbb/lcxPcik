<template>
    <div class="login">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login-form" :model="loginForm" :rules="rules" ref="forms">
                    <!-- <h1>hello</h1>
                    <h2>欢迎来到lcx-假选</h2> -->
                    <el-form-item label="账号：" prop="username">
                        <el-input :prefix-icon="UserFilled" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            :show-password="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="large" type="primary" class="login-btn" @click="signIn">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reqLogin } from '@/api/user';
import { useUserStore } from '@/store/useUserStore';
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loginFormData } from '@/api/user/type';
//拿到路由实例
const router = useRouter()
const route = useRoute()

//从pinia中拿到改变token方法
const { changeToken } = useUserStore()

//拿到表单实例
const forms = ref()

//表单数据
const loginForm = ref<loginFormData>({
    username: 'admin',
    password: '111111'
})

//表单校验规则
const rules = {
    username: [{ required: true, min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' }],
    password: [{ required: true, min: 6, message: 'Length should be 6 up', trigger: 'change' }]
}

//登录验证
const signIn = async () => {
    await forms.value.validate() //等待验证通过
    const res = await reqLogin(loginForm.value)
    console.log(res)
    if (res.code === 200) {
        //当前路由的query参数
        const rediect = route.query.rediect
        //pinia存储token
        changeToken(res.data as string)
        // changeToken('11')
        router.push(rediect as string || '/home')
        //左侧信息提示
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,${getTime()}好`
        })
    } else {
        ElNotification({
            type: 'error',
            message: res.data
        })
    }
}

//封装函数，获得当前时间是 上午||下午||晚上
const getTime = (): '上午' | '下午' | '晚上' => {
    const hour: number = new Date().getHours()
    if (hour <= 9) {
        return '上午'
    } else if (hour <= 18) {
        return '下午'
    } else {
        return '晚上'
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to top, rgb(233, 191, 198), rgb(150, 178, 187));
    font-weight: 550;

    :deep(.el-form-item__label) {
        color: white;
        mix-blend-mode: difference;
    }



    .el-form {
        // mix-blend-mode: screen;
        position: relative;
        top: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 60px 0;
        // color: lightpink;
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: center;
        width: 80%;
        border-radius: 10px;
        box-shadow: 5px 5px 5px gray, -5px -5px 5px #f5f5f5;

        .el-form-item {
            width: 80%;
        }

        .login-btn {
            // mix-blend-mode: normal;
            background-color: #e8e8e8;
            color: gray;
            width: 20%;

            &:hover {
                box-shadow: inset 2px 2px 7px rgb(132, 129, 129), inset -4px -4px 12px #ffffff;
            }
        }

        

    }



}
</style>