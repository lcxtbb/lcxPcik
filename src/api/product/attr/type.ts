

//返回的基本数据
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//分类数据的基础ts类型（即为一级分类）
export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number, 
    category2Id?: number 
}

//分类接口返回的具体数据
export type CategoryArr = CategoryObj[]

//分类接口返回的所有数据
export interface CategoryResponseData extends ResponseData {
    data: CategoryArr
}



//每一个属性值对应的ts类型
export interface AttrValue {
    id?: number,
    valueName: string,
    attrId?: number
}

//属性值的数组ts类型
export type AttrValueList = AttrValue[]

//每一个属性的对象
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueList
}

//属性的数组ts类型
export type AttrList = Attr[]

//属性接口返回的数据
export interface AttrListResponse extends ResponseData {
    data: AttrList
}