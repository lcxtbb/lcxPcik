//返回的基本数据
export interface responseData {
    code: number,
    message: string,
    ok: boolean
}

//返回的每一个数据类型
export interface tradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}

//返回的每一组数据类型
export type Records = tradeMark[]

//返回的 具体数据类型
export interface tradeMarkResponseData extends responseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}
