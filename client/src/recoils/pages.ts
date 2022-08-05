import {atom, selector} from "recoil";
export const SiteInfo = atom({
    key:"SiteInfo",
    default:{
        "id":"",
        "currentPage" : "index",
        "page":{
            "title":"",
            "content":""
        },
        "code":"",
        "control":{
            paneSize:5
        },
        "popup":{
            imgUpload:{
                main:"none",
                hyundai:"none",
                general:"none"
            }
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
export const popupImageUploadSelector = selector({
    key:"popupImageUploadSelector",
    get:({get})=>(get(SiteInfo).popup.imgUpload),
    set:({set,get},newValue:any)=>{
        set(SiteInfo,prevState => ({...prevState, "popup" : { "imgUpload":{...(prevState.popup.imgUpload),...newValue}}}))
    }
})
export const controlPaneSizeSelector = selector({
    key:"controlPaneSizeSelector",
    get:({get})=>(get(SiteInfo).control.paneSize),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"control":{paneSize:newValue}}))
    }
})
export const codeSelector = selector({
    key:"codeSelector",
    get:({get})=>(get(SiteInfo).code),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"code":newValue}))
    }
})