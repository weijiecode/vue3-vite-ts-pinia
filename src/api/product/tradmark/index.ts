import request from '@/utils/request'
import type { TrademarkResponseData, Trademark } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)

  export const reqAddOrUpdateTrademark = (data: Trademark) => {
    if (data.id) {
      return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
      return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
  }

  export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)