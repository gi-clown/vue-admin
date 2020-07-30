import $http from '../utils/http';

const Getcaptcha = (data) => $http.get('/api/v1/getCaptcha');       //获取验证码
const Login = (data) => $http.post('/login',data);                  //用户登陆


export default {
    Getcaptcha,
    Login
}