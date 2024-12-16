
import { reqUserInfo } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
//useinfo接口数据
import { userResponseData } from '@/api/user/type'

export const useUserStore = defineStore('useUserStore', () => {

    //定义用户TOKEN
    const TOKEN = ref<string>('')

    //改变用户TOKEN
    const changeToken = (val: string) => {
        TOKEN.value = val
    }

    //用户信息的初始数据
    const userAvater = ref('')
    const userInfo = ref<userResponseData>({
        routes: [],
        buttons: [],
        roles: [],
        name: '',
        avatar: ''
    })

    //获取用户信息的方法
    const getUserInfo = async () => {
        const res = await reqUserInfo()
        console.log(res)
        if (res.code === 200) {
            userAvater.value = "src/assets/images/tx.jpg"
            userInfo.value = res.data
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    //清除用户信息和TOEKN的方法
    const deleUser = () => {
        TOKEN.value = ''
        userAvater.value = ''
        userInfo.value = {
            routes: [],
            buttons: [],
            roles: [],
            name: '',
            avatar: ''
        }
    }

    return {
        TOKEN,
        changeToken,
        userAvater,
        userInfo,
        getUserInfo,
        deleUser
    }
},
    {
        persist: {                      // 启用持久化
            storage: localStorage,        // 使用 localStorage 来存储数据
            pick: ['TOKEN']
        }
    }
) 