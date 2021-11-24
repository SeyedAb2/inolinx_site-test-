export interface ArticlePostSingleMagezine{
    results: ArticlePostSingleMagezine[];
    count:number,
    next:null | string,
    previous:null | string,
    title:string,
    text:string,
    is_show_author:boolean,
    publish_date:string,
    visitor_counter:number,
    slug:string,
    logo:string | null, 
    magazine_username:string
    magazine_isverify:boolean,
    hashtags:[],
    author:{
        first_name:string,
        last_name:string,
        username:string,
        profile_text:string,
        profile_photo:string,
        banner_photo:string,
        info:string
    },
    magazine:{
        username:string,
        name:string,
        description:string,
        slogan:string,
        create_date:string,
        logo:string,
        banner:string,
        is_verify:boolean
    }
}