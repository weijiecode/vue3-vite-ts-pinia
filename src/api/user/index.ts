import request from '@/utils/request.ts'
import type { loginFormData, loginResponseData, userResponseData } from './type.ts'
// 统一管理接口
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}
// 用户登录
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.post<any, userResponseData>(API.USERINFO_URL)