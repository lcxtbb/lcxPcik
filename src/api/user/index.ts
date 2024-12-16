import request from "../request";
//引入类型
import { loginForm, loginResponse, userResponse } from "./type"; 

//枚举 api
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

//登录接口
export const reqLogin = (data: loginForm) => request<any, loginResponse>({url: API.LOGIN_URL, method: 'post', data})

//用户信息接口
export const reqUserInfo = () => request<any, userResponse>({url: API.USERINFO_URL, method: 'get'})