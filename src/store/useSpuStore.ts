import { reqAllSale, reqAllTrademark, reqSpuImageList, reqSpuSale } from "@/api/product/spu";
import { defineStore } from "pinia";
import { ref } from "vue";

//引入 ts 类型
import type { SaleAttr, ExistingSale, SpuImage } from "@/api/product/spu/type";

export const useSpuStore = defineStore('spu', () => {

    const spuName = ref<string | number>('')    //spu 名称

    const spuAttr = ref<any>('')    //spu 的品牌

    const spuDecribe = ref<string>('')    //spu 描述

    const spuImgList = ref<SpuImage[]>([])     //spu 图片列表

    const spuSaleList = ref<SaleAttr[]>([])    //spu 销售属性

    const allSaleList = ref<ExistingSale[]>([])     //所有的销售属性

    //获取所有品牌的数据的方法
    const getAllTrademark = async () => {
        const res = await reqAllTrademark()
        console.log(1,res)
        if (res.code === 200) {
            spuAttr.value = res.data
        }
    }

    //获取 spu 下的所有售卖商品的图片数据的方法
    const getSpuImgList = async (id: number) => {
        const res = await reqSpuImageList(id)
        console.log(2,res)
        if (res.code === 200) {
            spuImgList.value = res.data
        }
    }

    //获取 spu 下的所有销售属性列表的方法
    const getSpuSaleList = async (id: number) => {
        const res = await reqSpuSale(id)
        console.log(3,res)
        if (res.code === 200) {
            spuSaleList.value = res.data
        }
    }

    //获取全部的销售属性列表的方法
    const getAllSaleList = async () => {
        const res = await reqAllSale()
        console.log(4,res)
        if (res.code === 200) {
            allSaleList.value = res.data
        }
    }

    //修改数据获取修改的数据
    const getUpdateData = (name: string, decribe: string) => {
        spuName.value = name
        spuDecribe.value = decribe
    }

    //添加/修改数据获取全部请求数据的方法
    const getAllResData = async (id?: number) => {
        // getAllTrademark()
        getAllSaleList()
        if (id) {
            getSpuImgList(id)
            getSpuSaleList(id)
        }
    }



    return {
        spuName, spuAttr, spuDecribe, spuImgList, spuSaleList, allSaleList,
        getAllResData, getUpdateData
    }
})