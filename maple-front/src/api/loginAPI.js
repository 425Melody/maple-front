import httpInstance from '../utils/http'

//{phone,code}这样是对象的结构赋值
export default function LoginAPI(phone,code){
    return httpInstance({
        method: 'post',
        url: '/user/login',
        data:{
            phone,
            code
        }
    })
}