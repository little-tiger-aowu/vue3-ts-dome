import request from "@/utils/request";
import type {pageType} from "@/type/menu";

export function getAllMenu(params:pageType){
    return request({
        url:'menuList/allMenu',
        method:'GET',
        params
    })
}
