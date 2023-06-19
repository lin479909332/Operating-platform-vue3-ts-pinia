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

// 品牌数据的ts类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

// 品牌接口返回的数据的ts类型
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

// 商品图片的ts类型
export interface SpuImg {
  id: number
  spuId: number
  imgName: string
  imgUrl: string
}

// 已有的SPU的照片墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

// 已有的销售属性值对象的ts类型
export interface SaleAttrValue {
  id?: number
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: null
}

// 已有的销售属性值数组类型
export type spuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象ts类型
export interface SaleAttr {
  id: number
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  spuSaleAttrValueList: spuSaleAttrValueList
}

// SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 全部销售属性的返回数据ts类型
export interface AllSaleAttr {
  id: number
  name: string
}

// 全部销售属性接口返回数据ts类型
export interface AllSaleAttrResponseData extends ResponseData {
  data: AllSaleAttr[]
}
