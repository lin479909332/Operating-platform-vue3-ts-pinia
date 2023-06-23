// sku模块接口管理
import request from '@/utils/request'
import type { SkuResponseData } from './type'

// sku模块相关的接口地址
enum API {
  // 获取sku
  SKU_URL = '/admin/product/list/',
}

// 获取sku
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
