export interface ShowDetail {
    title:string,
    text:string,
    logo:string | null,
    view:number,
    slug:string,
    publish_date:string,
    is_show_author:boolean,
    visitor_counter:number,
    hashtags:[],
    magazine:{
        username:string,
        name:string,
        description:string,
        slogan:string,
        create_date:string,
        logo:string | null,
        banner:string | null,
        is_verify:boolean
    },
    author:{
        first_name:string,
        last_name:string,
        username:string,
        profile_text:string,
        profile_photo:string | null,
        banner_photo:string | null,
        info:string
    }
}
