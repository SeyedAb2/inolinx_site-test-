export interface ProfileAllPost{
    count:number,
    next:null | string,
    previous:null | string,
    results:ProfileAllPost[],
    title:string,
    slug:string,
    visitor_counter:number,
    text:string,
    logo:string | null,
    publish_date:string,
    is_show_author:boolean,
    hashtags:[],
    author:{
        first_name:string,
        last_name:string,
        username:string,
        profile_text:string,
        profile_photo:string | null,
        banner_photo:string | null,
        info:string,
    },
    magazine:{
        username:string,
        name:string,
        description:string,
        slogan:string | null,
        create_date:string,
        logo:string | null,
        banner:string | null,
        is_verify: boolean
    }
}
