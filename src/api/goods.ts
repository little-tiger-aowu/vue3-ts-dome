import type {pageType,UpdataType,addType} from "@/type/goods";
import request from "@/utils/request";


export function getGoods(params: pageType){
    return request({
        url:'/goods/allgoods',
        method: 'GET',
        params
    })
}

type deleteType = {
    goodsId:number
}
export function delGoodsBYId(params: deleteType){
    return request({
        url:'goods/delById',
        method: 'DELETE',
        params
    })
}

export function upGoodsInfo(params: UpdataType){
    return request({
        url:"/goods/upGoods",
        method:'POST',
        params
    })
}

export function addGoods(params: UpdataType){
    return request({
        url:"/goods/addGoods",
        method:'POST',
        params
    })
}

// mock
export function getMenuList() {
    return request({
        url:"/menu/list",
        method:'get',
    })
}
