export interface userType {
    user_id:number
    userName:string
    role_id:number[]
    roles:roleType[]
}
export interface roleType {
    identity_id:number
    identity_name:string
}

export class userData {
    userList:userType[] = []
}
