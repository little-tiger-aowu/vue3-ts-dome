import request from "@/utils/request";
import type {loginType} from "@/type/login";
import type {pageType} from "@/type/goods";

export function login(params: loginType){
    return request({
        url:'api/login',
        method:'POST',
        params
    })
}

export function getAllUser(){
    return request({
        url:'api/userList',
        method:'GET',
    })
}


