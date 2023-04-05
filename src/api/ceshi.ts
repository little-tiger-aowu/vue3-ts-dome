import request from "@/utils/request";

export function mockCeshi(){
    return request({
        url:'/user/menu',
        method: 'get',
    })
}
