// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// sku对象的ts类型
export interface Attr {
  // 平台属性的ID
  attrId: number | string
  // 属性值的ID
  valueId: number | string
  attrIdAndValueId?: string
}
export interface saleAttr {
  // 属性ID
  saleAttrId: number | string
  // 属性值的ID
  saleAttrValueId: number | string
}
export interface SkuData {
  // 三级分类的ID
  category3Id: CategoryId
  // 已有的SPU的ID
  spuId: string | number
  // SPU品牌的ID
  tmId: string | number
  // sku名字
  skuName: string
  // sku价格
  price: string | number
  // sku重量
  weight: string | number
  // sku的描述
  skuDesc: string
  // 平台属性
  skuAttrValueList?: Attr[]
  // 销售属性
  skuSaleAttrValueList?: saleAttr[]
  // sku图片地址
  skuDefaultImg: string
  // 控制sku的上架与下架
  isSale?: number
  // sku的id（上下架需要）
  id?: number
}

// 获取sku接口返回的数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
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
