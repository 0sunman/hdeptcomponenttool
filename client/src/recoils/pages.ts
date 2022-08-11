import {atom, selector} from "recoil";
type SiteInfo = {
    "id":string,
    "alert":{visible:boolean,text:string},
    "currentPage" : string,
    "page":Page,
    "code":string,
    "control":{
        paneSize:20,
        device:("pc"|"mo")
    },
    "popup":{
        imgUpload:ImageUploader
    }

}
type Page = {
    "path":string,
    "title":string,
    "selector":string,
    "content":string,
    "imgUrl":string
}
type ImageUploader = {
    main:boolean,
    hyundai:string,
    general:string
}
export const SiteInfo = atom<SiteInfo>({
    key:"SiteInfo",
    default:{
        "id":"",
        "alert":{visible:true,text:""},
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
                main:false,
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
        set(SiteInfo,(prevState):SiteInfo => ({...prevState, "currentPage" : newValue}))
    }
})
export const IdSelector = selector({
    key:"IdSelector",
    get:({get})=>(get(SiteInfo).id),
    set:({set,get},newValue)=>{
        set(SiteInfo, (prev):SiteInfo => ({...prev,"id":newValue}))
    }
})
export const alertSelector = selector<boolean>({
    key:"alertSelector",
    get:({get})=>(get(SiteInfo).alert.visible),
    set:({set,get},newValue)=>{
        set(SiteInfo, (prev):SiteInfo  => ({...prev,"alert":{...(prev.alert),"visible":newValue}}))
    }
})
export const alertTextSelector = selector<string>({
    key:"alertTextSelector",
    get:({get})=>(get(SiteInfo).alert.text),
    set:({set,get},newValue)=>{
        set(SiteInfo, (prev):SiteInfo => ({...prev,"alert":{...(prev.alert),"text":newValue}}))
    }
})
export const writeSelector = selector({
    key:"writeSelector",
    get:({get})=>(get(SiteInfo).page),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo  =>({...prev,"page":newValue}))
    }
})
export const pathSelector = selector({
    key:"pathSelector",
    get:({get})=>(get(SiteInfo).page.path),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo  =>({...prev,"page":{"path":newValue}}))
    }
})


export const imgUrlSelector = selector({
    key:"imgUrlSelector",
    get:({get})=>(get(SiteInfo).page.path),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo  =>({...prev,"page":{"imgUrl":newValue}}))
    }
})

export const selectorSelector = selector({
    key:"selectorSelector",
    get:({get})=>(get(SiteInfo).page.selector),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo  =>({...prev,"page":{"selector":newValue}}))
    }
})
export const popupImageUploadSelector = selector({
    key:"popupImageUploadSelector",
    get:({get})=>(get(SiteInfo).popup.imgUpload),
    set:({set,get},newValue)=>{
        set(SiteInfo,(prevState):SiteInfo  => ({...prevState, "popup" : { "imgUpload":{...(prevState.popup.imgUpload),...newValue}}}))
    }
})
export const controlPaneSizeSelector = selector({
    key:"controlPaneSizeSelector",
    get:({get})=>(get(SiteInfo).control.paneSize),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo =>({...prev,"control":{"paneSize":newValue}}))
    }
})


export const deviceSelector = selector({
    key:"deviceSelector",
    get:({get})=>(get(SiteInfo).control.device),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo =>({...prev,"control":{"device":newValue}}))
    }
})

export const codeSelector = selector({
    key:"codeSelector",
    get:({get})=>(get(SiteInfo).code),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo =>({...prev,"code":newValue}))
    }
})