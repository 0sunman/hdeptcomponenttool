import {atom, selector} from "recoil";
type SiteInfo = {
    "id":string,
    "error":boolean,
    "currentPage" : string,
    "page":{
        "path":string,
        "title":string,
        "selector":string,
        "content":string,
        "imgUrl":string
    },
    "code":string,
    "control":{
        paneSize:20,
        device:("pc"|"mo")
    },
    "popup":{
        imgUpload:{
            main:string,
            hyundai:string,
            general:string
        }
    }

}
export const SiteInfo = atom<SiteInfo>({
    key:"SiteInfo",
    default:{
        "id":"",
        "error":true,
        "currentPage" : "index",
        "page":{
            "path":"",
            "title":"",
            "selector":"",
            "content":"",
            "imgUrl":""
        },
        "code":"",
        "control":{
            paneSize:20,
            device:"pc"
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
export const errorSelector = selector<boolean>({
    key:"errorSelector",
    get:({get})=>(get(SiteInfo).id),
    set:({set,get},newValue)=>{
        set(SiteInfo, prev => ({...prev,"error":newValue}))
    }
})
export const writeSelector = selector({
    key:"writeSelector",
    get:({get})=>(get(SiteInfo).page),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"page":newValue}))
    }
})
export const pathSelector = selector({
    key:"pathSelector",
    get:({get})=>(get(SiteInfo).page.path),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"page":{"path":newValue}}))
    }
})


export const imgUrlSelector = selector({
    key:"imgUrlSelector",
    get:({get})=>(get(SiteInfo).page.path),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"imgUrl":{"imgUrl":newValue}}))
    }
})

export const selectorSelector = selector({
    key:"selectorSelector",
    get:({get})=>(get(SiteInfo).page.selector),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"page":{"selector":newValue}}))
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


export const deviceSelector = selector({
    key:"deviceSelector",
    get:({get})=>(get(SiteInfo).control.device),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"control":{device:newValue}}))
    }
})

export const codeSelector = selector({
    key:"codeSelector",
    get:({get})=>(get(SiteInfo).code),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, prev =>({...prev,"code":newValue}))
    }
})