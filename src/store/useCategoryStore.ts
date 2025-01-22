import { reqAttr, reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { defineStore } from "pinia";
import { ref } from "vue";

//引入ts类型
import type { CategoryArr, AttrList } from "@/api/product/attr/type";

export const useCategoryStore = defineStore('category', () => {

    // 一级分类数据
    const c1Arr = ref<CategoryArr>([])

    // 二级分类数据
    const c2Arr = ref<CategoryArr>([])

    // 三级分类数据
    const c3Arr = ref<CategoryArr>([])

    //获取一级分类和二级分类的id
    const c1Id = ref<number | string>('')
    const c2Id = ref<number | string>('')
    const c3Id = ref<number | string>('')

    //分类对应的属性数据
    const attrList = ref<AttrList>([])

    //attr 卡片组件展示的不同样式（0 展示 table，1展示添加的页面）
    const scene = ref<number>(0)

    //获取一级分类数据
    const getC1Arr = async () => {
        const res = await reqC1()
        if (res.code === 200) {
            console.log(res)
            c1Arr.value = res.data
        }
    }

    //获取二级分类数据
    const getC2Arr = async (c1Id: number | string) => {
        const res = await reqC2(c1Id)
        if (res.code === 200) {
            console.log(res)
            c2Arr.value = res.data
        }
    }

    //获取三级分类数据
    const getC3Arr = async (c2Id: number | string) => {
        const res = await reqC3(c2Id)
        if (res.code === 200) {
            console.log(res)
            c3Arr.value = res.data
        }
    }

    //清除所有分类数据或清除三级分类数据
    const clearCategorry = (isClearC3: boolean = false) => {
        //清空分类对应属性的数据(二级分类 和 一级分类改变时都需要清除)
        attrList.value = []

        if (isClearC3) {
            //将三级分类数据赋值为空，并且将二级分类和三级分类初始值赋值为空字符串
            c3Arr.value = []
            c2Id.value = ''
            c3Id.value = ''
        } else {
            //将三级分类初始值赋值为空
            c3Id.value = ''
        }
    }

    //清除所有数据
    const clearAllData = () => {
        c1Arr.value = []
        c2Arr.value = []
        c3Arr.value = []
        c1Id.value = ''
        c2Id.value = ''
        c3Id.value = ''
        attrList.value = []
    }

    //获取attr分类的对应的属性对象数据
    const getAttr = async () => {
        const res = await reqAttr(c1Id.value, c2Id.value, c3Id.value)
        if (res.code === 200) {
            console.log(res)
            attrList.value = res.data
        }
    }

    // attr 修改卡片组件对应的数据
    const changeScene = (val: number) => {
        scene.value = val
    } 

    return {
        c1Id, c2Id, c3Id,
        c1Arr,
        getC1Arr,
        c2Arr,
        getC2Arr,
        c3Arr,
        getC3Arr,
        clearCategorry,
        getAttr, attrList,
        clearAllData,
        scene, changeScene
    }
})