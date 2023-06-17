// 品牌管理模块接口
import request from '@/utils/request'
import { TrademarkResponseData, Trademark } from './type'

// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}
// 获取已有品牌接口方法
//page:获取第几页 ---默认第1页
//limit:获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    // 存在id 修改品牌
    return request.post<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 不存在id 新增品牌
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  }
}
