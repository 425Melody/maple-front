import httpInstance from '../utils/http'

//发送验证码
export default function sendcode(phone){
    return httpInstance({
        method:'post',
        url:'/user/sendcode',
        data:{
            phone:phone
        }
    })
}