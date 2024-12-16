
//接受的面包屑数据的类型
export interface BreadType{
    title: string,
    icon: string
    hidden: boolean,
    path: string
}



import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeaderStore = defineStore('Header', () => {

    //定义左侧菜单折叠的初始数据
    const isColl = ref<boolean>(false)

    //改变左侧菜单折叠状态
    const changeColl = () => {
        isColl.value = !isColl.value
    }

    //定义面包屑初始数据
    const bread = ref<BreadType[]>([])

    //面包屑增加的逻辑
    const changeBread = (val: BreadType) => {
        if(!bread.value.some(item => val.title === item.title)) {
            bread.value.push(val)
        }
    }

    //二级路由刷新的初始数据
    const refresh = ref<boolean>(true)

    //路由刷新的方法
    const changeRefresh = () => {
        refresh.value = !refresh.value
    }

    return {
        isColl,
        changeColl,
        bread,
        changeBread,
        refresh,
        changeRefresh
    }
})