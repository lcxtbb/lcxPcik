
import { reqUserInfo } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {

    //定义用户TOKEN
    const TOKEN = ref<string>('')

    //改变用户TOKEN
    const changeToken = (val: string) => {
        TOKEN.value = val
    }

    //用户信息的初始数据
    const userAvater = ref('')
    const userName = ref('')

    //获取用户信息的方法
    const getUserInfo = async () => {
        const res = await reqUserInfo()
        console.log(res)
        if(res.code === 200) {
            // userInfo.value.avatar = res.data.checkUser.avatar
            userAvater.value = "src/assets/images/tx.jpg"
            userName.value = res.data.checkUser.username
            return 'ok'
        } else {
            return Promise.reject(new Error('TOKEN失效哦啊'))
        }
    }

    //清除用户信息和TOEKN的方法
    const deleUser = () => {
        TOKEN.value = ''
        userAvater.value = ''
        userName.value = ''
    }
    return {
        TOKEN,
        changeToken,
        userAvater,
        userName,
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