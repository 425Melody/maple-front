import httpInstance from "../utils/http";

export default function getUserIcon(){
    return httpInstance({
        method:'get',
        url:'/user/icon'
    })
}