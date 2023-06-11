// 响应体数据类型（公共部分）
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有品牌的ts数据类型
export interface Trademark {
  id?: number
  createTime?: string
  updateTime?: string
  tmName: string
  logoUrl: string
}

// 包含全部品牌数据的ts类型
export type Records = Trademark[]

//获取的已有全部品牌的数据ts类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: any
    maxLimit: any
    searchCount: boolean
    pages: number
  }
}
