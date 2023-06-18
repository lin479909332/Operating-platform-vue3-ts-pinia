// SPU相关的API
import request from '@/utils/request'
// 引入类型
import type { CategoryId, HasSpuResponseData } from './type'

// SPU相关的API地址
enum API {
  // 获取SPU的地址
  GETSPU_URL = '/admin/product/',
}

// 获取某一个三级分类下的SPU数据
export const reqGetSpu = (page: number, limit: number, category3Id: CategoryId) =>
  request.get<any, HasSpuResponseData>(
    API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
