export interface MagezineDetail{
    count:number,
    next:null | string,
    previous:null | string,
    results:MagezineDetail[],
    username:string,
    name:string,
    create_date:string,
    banner:string,
    is_verify:boolean,
    description:string,
    logo:string | null, 
    slogan:string
}