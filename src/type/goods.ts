export interface pageType {
    page: number
    size: number
    keywords: string
}
export interface goodsType {
    product_id:number
    name:string
    price: number
    quantity:number
}
export interface totalType {
    total:number
}

export interface UpdataType {
    goodsName:string
    goodsDescribe:string
    goodsId:number
}

export interface addType {
    goodsName:string
    goodsDescribe:string
}

export class goodsDate {
    pageType = {
        page: 1,
        size: 5,
        keywords: ''
    }
    totalType = {
        total: 0
    }
    goodsList:goodsType[] = []
    updataGoods:UpdataType = {
        goodsName:'',
        goodsDescribe:'',
        goodsId:0
    }
    addGoods:addType = {
        goodsName:'',
        goodsDescribe:'',
    }
}
