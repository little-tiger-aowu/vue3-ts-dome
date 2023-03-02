export interface menuType {
    mid:number,
    options:string,
    values:string
}

export interface pageType {
    page: number,
    size: number,
}

export class menuAllType {
    menuItem:menuType[] = []
    pageType = {
        page: 1,
        size: 10,
    }
}
