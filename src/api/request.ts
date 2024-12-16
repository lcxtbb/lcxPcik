//二次封装axios

import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

const request = axios.create({
    //基础路ing
    baseURL: '/api',
    //超时时间
    timeout: 7000
})

//请求拦截器
request.interceptors.request.use((config) => {
    //放回config配置对象，可包含请求头
    const { TOKEN } = storeToRefs(useUserStore())
    if(TOKEN.value) {
        config.headers.token = TOKEN.value
    }
    return config
})

//响应拦截器
request.interceptors.response.use(
    (res) => {
        return res.data
    },
    (error) => {
        //处理网络错误
        let msg = '';
        let status = error.response.status;
        switch (status) {
            case 401:
                msg = "token过期";
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
        ElMessage({
            type: 'error',
            message: msg
        })

        return Promise.reject(error)
    }
)

export default request