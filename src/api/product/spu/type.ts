//服务器接口返回的基本类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//每个 spu 的数据类型
export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: number | string,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImage[]
}
//spu 的数组数据
export type Records = SpuData[]
//获取 spu 返回的具体数据
export interface GetSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
} 

//获取的单个品牌数据的 ts 类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string
}
//获取品牌接口返回的数据
export interface AllTrademarkResponseData extends ResponseData {
    data: Trademark[]
}

//spu 下的单个商品图片的 ts 类型
export interface SpuImage {
    id: number,
    createTime?: string,
    updateTime?: string,
    spuId?: string,
    imgName: string,
    imgUrl: string
}
//spu 图片数据返回的数据
export interface SpuImageResponseData extends ResponseData {
    data: SpuImage[]
}

//spu 的单个销售属性值
export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName: string,
    isChecked?: null
}
//spu 的销售属性值数组
export type SpuSaleAttrValueList = SaleAttrValue[]
//spu 的单个销售属性 ts 类型
export interface SaleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    saleAttrValueName: string,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValueList
}
//spu 销售属性接口返回的数据
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

//已有的单个销售属性 ts 类型
export interface ExistingSale {
    id: number,
    name: string
}
//获取所有销售属性返回的数据
export interface ExistingSaleAttrResponseData extends ResponseData {
    data: ExistingSale[]
}