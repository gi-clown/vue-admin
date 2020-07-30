import axios from 'axios'
// 使用element-ui Message做消息提醒
import { Loading, Message } from 'element-ui'
import Tool from './tool'

axios.defaults.baseURL = 'http://www.zhangwj.com:8000';

let loading

//请求拦截器调用加载栏
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中....',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

//成功响应关闭加载栏
function endLoading() {
    loading.close()
}

//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: process.env.BASE_API,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 10 * 1000
})

const codeMessage = {
    201: "太棒了，保存成功！",
    202: "您的请求已提交，请耐心等待服务器处理！",
    204: "太棒了，删除成功！",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    405: "请求方法未允许",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。"
};


// 2.请求拦截器
service.interceptors.request.use(config => {
    startLoading();
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
    const token = Tool.getCookie('AdminToken'); 
    config.data = JSON.stringify(config.data);
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if(token && token !== null){
        config.headers.Authorization = token;
    }
    
    return config
}, error => {
    Promise.reject(error)
});


// 3.响应拦截器
service.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    endLoading();
    return response
}, error => {
    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
        error.message = codeMessage['error.response.status'];
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            Message.error('服务器响应超时，请刷新当前页')
        }
        error.message = '连接服务器失败';
    }

    Message.error(error.message)
    endLoading();
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response)
})


const http = {
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url, params='') {
        const config = {
            method: 'get',
            url: url
        }
        if (params) config.params = params
        return service(config)
    },
    post(url, params='') {
        const config = {
            method: 'post',
            url: url
        }
        if (params) config.data = params
        return service(config)
    },
    put(url, params) {
        const config = {
            method: 'put',
            url: url
        }
        if (params) config.params = params
        return service(config)
    },
    delete(url, params) {
        const config = {
            method: 'delete',
            url: url
        }
        if (params) config.params = params
        return service(config)
    }
}
//导出
export default http