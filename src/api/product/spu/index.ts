// SPU相关的API
import request from '@/utils/request'
// 引入类型
import type {
  CategoryId,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
  SpuData,
  SkuData,
} from './type'

// SPU相关的API地址
enum API {
  // 获取SPU的地址
  GETSPU_URL = '/admin/product/',
  // 获取全部品牌的地址
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部的售卖商品的图片数据
  SPUIMAGELIST_URL = '/admin/product/spuImageList/',
  // 获取某个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 追加一个新的SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
}

// 获取某一个三级分类下的SPU数据
export const reqGetSpu = (page: number, limit: number, category3Id: CategoryId) =>
  request.get<any, HasSpuResponseData>(
    API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

// 获取全部品牌
export const reqAllTradeMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)

// 获取某一个已有的SPU下全部商品的图片
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.SPUIMAGELIST_URL + spuId)

// 获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

// 获取全部销售属性
export const reqAllSaleAttr = () => request.get<any, AllSaleAttrResponseData>(API.ALLSALEATTR_URL)

//添加一个新的SPU的
//更新已有的SPU接口
//data:即为新增的SPU|或者已有的SPU对象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  //如果SPU对象拥有ID,更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}

// 追加一个新的SKU
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)
