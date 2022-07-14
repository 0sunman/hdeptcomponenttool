import {atom, selector} from "recoil";
export const SiteInfo = atom({
    key:"SiteInfo",
    default:{
        "id":"",
        "currentPage" : "index",
        "page":{
            "title":"",
            "content":""
        }
    }    
})

export const CurrentPageSelector = selector({
    key:"CurrentPageSelector",
    get:({get})=>(get(SiteInfo).currentPage),
    set:({set,get},newValue)=>{
        set(SiteInfo,prevState => ({...prevState, "currentPage" : newValue}))
    }
})
export const IdSelector = selector({
    key:"IdSelector",
    get:({get})=>(get(SiteInfo).id),
    set:({set,get},newValue)=>{
        set(SiteInfo, prev => ({...prev,"id":newValue}))
    }
})
export const writeSelector = selector({
    key:"writeSelector",
    get:({get})=>(get(SiteInfo).page),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"page":newValue}))
    }
})