
import request from "../../request";
import type { tradeMarkResponseData, tradeMark } from "./type";

//枚举接口地址
enum API {

    //获取已有品牌的接口
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌的接口
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改已有品牌的接口
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除已有品牌的接口
    DELETE_URL = '/admin/product/baseTrademark/remove'
}

//获取已有品牌
export const reqGetTrademar = (page :number, limit: number) => request<any, tradeMarkResponseData>({url: API.TRADEMARK_URL + `${page}/${limit}`, method: 'get'})

//添加或者修改品牌品牌
export const reqAddOrUpdateTrademar = (data :tradeMark) => {
    //如有 data 有id，就是修改数据。反之为添加数据
    if(data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    }else {

        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

//删除已有品牌的数据
export const reqDeleteTrademar = (id: number) => request.delete<any, any>(API.DELETE_URL + id)