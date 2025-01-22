import request from "@/api/request";

//引入ts数据类型
import type { Attr, AttrListResponse, CategoryResponseData } from "./type";

enum API {
    //一级分类的接口
    C1_URL = "/admin/product/getCategory1",

    //二级分类接口
    C2_URL = "/admin/product/getCategory2/",

    //三级分类接口
    C3_URL = "/admin/product/getCategory3/",

    //获取分类对应的属性的接口
    ATTR_URL = "/admin/product/attrInfoList/",

    //添加或修改属性的接口
    ADDORUPDATEATTR_UARL = "/admin/product/saveAttrInfo",

    //删除已有属性的接口
    DELETEATTR_URL = "/admin/product/deleteAttr/"

}

//获取一级分类的数据
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

//获取二级分类的数据
export const reqC2 = (C1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + C1Id)

//获取三级分类的数据
export const reqC3 = (C2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + C2Id)

//获取分类对应的属性
export const reqAttr = (c1Id: number | string, c2Id: number | string, c3Id: number | string) =>
    request.get<any, AttrListResponse>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)

//添加或修改属性
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_UARL, data)

//删除已有属性
export const reqDeleteAttr = (id: number) => request.delete<any, any>(API.DELETEATTR_URL + id)