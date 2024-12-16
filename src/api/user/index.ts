import request from "../request";
//引入类型
import { loginFormData, loginRes, userResponse } from "./type"; 

//枚举 api
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info'
}

//登录接口
export const reqLogin = (data: loginFormData) => request<any, loginRes>({url: API.LOGIN_URL, method: 'post', data})

//用户信息接口
export const reqUserInfo = () => request<any, userResponse>({url: API.USERINFO_URL, method: 'get'})