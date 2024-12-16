
//登录需要的参数类型
export interface loginForm {
    username: string,
    password: string
}

//登录响应数据的类型
interface loginResponseData {
    token?: string
    message?: string 
}

export interface loginResponse {
    code: number,
    data: loginResponseData
}




//获取一个用户信息接口的返回类型
interface checkUserData {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}

interface userResponseData {
    checkUser: checkUserData
}
export interface userResponse {
    code: number,
    data: userResponseData
}