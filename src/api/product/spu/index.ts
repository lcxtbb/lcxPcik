import request from "@/api/request";
//引入ts类型
import type { GetSpuResponseData, AllTrademarkResponseData, SpuImageResponseData, SaleAttrResponseData, ExistingSaleAttrResponseData, SpuData } from "./type";
enum API {
    //获取 spu 数据的接口
    GETSPU_URL = "/admin/product/",

    //获取全部spu品牌数据的接口
    ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",

    //获取 spu 下的所有售卖商品的图片数据的接口
    IMAGE_URL = "/admin/product/spuImageList/",

    //获取 spu 下的所有销售属性列表的接口
    SPUSALEATTR = "/admin/product/spuSaleAttrList/",

    //获取全部的销售属性列表的接口
    ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",

    //添加新的 spu 的接口
    ADDSPU_URL = "/admin/product/saveSpuInfo"
}

//获取 spu 数据
export const reqGetSpu = (page: number, limit: number, id: string | number) => request.get<any, GetSpuResponseData>(API.GETSPU_URL + `${page}/${limit}?category3Id=${id}`)

//获取全部spu品牌数据
export const reqAllTrademark = () => request.get<any, AllTrademarkResponseData>(API.ALLTRADEMARK_URL)

//获取spu下的所有售卖商品的图片数据
export const reqSpuImageList = (id: number) => request.get<any, SpuImageResponseData>(API.IMAGE_URL + id)

//获取 spu 下的所有销售属性列表
export const reqSpuSale = (id: number) => request.get<any, SaleAttrResponseData>(API.SPUSALEATTR + id)

//获取全部的销售属性列表
export const reqAllSale = () => request.get<any, ExistingSaleAttrResponseData>(API.ALLSALEATTR_URL)

//添加新的 spu
export const reqAddOrUpateSpu = (data: SpuData) => {
    if(data.id) {
        return request.post(API.ADDSPU_URL, data)
    }
    return request.post(API.ADDSPU_URL, data) 
} 