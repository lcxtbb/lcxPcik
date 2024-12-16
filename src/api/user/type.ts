
//登录需要的参数类型
export interface loginFormData {
    username: string,
    password: string
}

//登录接口失败返回的数据
export interface loginRej {
    code: number,
    message: string,
    ok: boolean
}
//成功返回的数据
export interface loginRes extends loginRej {
    data: string
}



//获取用户信息返回的类型
export interface userResponse extends loginRej {
    data: userResponseData
}

export interface userResponseData {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
}