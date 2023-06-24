// sku模块接口管理
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'

// sku模块相关的接口地址
enum API {
  // 获取sku
  SKU_URL = '/admin/product/list/',
  // 上架sku
  SALE_URL = '/admin/product/onSale/',
  // 下架sku
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 获取sku详情
  SKUINFO_URL = '/admin/product/getSkuInfo/',
}

// 获取sku
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 上架sku
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId)

// 下架sku
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)

// 获取sku详情
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
