// 分类id类型
export declare type CategoryId = number | string

//服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: CategoryId
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
}

//数组:元素都是已有SPu数据类型
export type Records = SpuData[]

//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
