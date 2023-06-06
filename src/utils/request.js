import axios from 'axios'
import router from "@/router";

import { ElMessage } from 'element-plus'


const request = axios.create({
    baseURL: '/api',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 10000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // config.headers['token'] =  sessionStorage.getItem("Token");  // 设置请求头

    //获取登录信息
    // let userJson = sessionStorage.token
    // debugger
    // if(!userJson){
    //     router.push("/login")
    // }

    let token = sessionStorage.getItem('Token');
    if (token!==null && token !=='') {
        // config.headers['Authorization'] = token;
        config.headers['Token'] = token;
    }

    return config
}, error => {
    return Promise.reject(error)
});

let status = true;
// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        if(res.code == "401" && status){
            sessionStorage.removeItem('Token');
            sessionStorage.removeItem('userName');
            router.push({
                path:'/Login',
            });
            status = false;
            ElMessage({
                message: res.msg,
                type: 'error',
            })
            let timeout = setTimeout(() => {
                status = true;
                clearTimeout(timeout);
            }, 2000)
        }
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request