// 属性管理相关的api
import request from '@/utils/request'
// 属性管理相关的地址
enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/{category1Id}',
  // 获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/{category2Id}',
}

// 获取一级分类的方法
export const reqC1 = () => request.get<any, any>(API.C1_URL)
// 获取二级分类的方法
export const reqC2 = (category1Id: number) => request.get<any, any>(API.C2_URL + category1Id)
// 获取三级分类的方法
export const reqC3 = (category2Id: number) => request.get<any, any>(API.C3_URL + category2Id)