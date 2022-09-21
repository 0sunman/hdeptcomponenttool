import {atom, selector} from "recoil";
type SiteInfo = {
    "isLoginPopup":boolean,
    "userid":string,
    "isLogin":boolean,
    "id":string,
    "alert":{visible:boolean,text:string},
    "currentPage" : string,
    "isPreviewDOMLoaded":boolean,
    "page":Page,
    "code":string,
    "control":{
        paneSize:20,
        device:("pc"|"mo")
    },
    "popup":{
        imgUpload:ImageUploader
    }
    "IFrameDOM":[]

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
        "isLoginPopup":true,
        "userid":"",
        "isLogin":true,
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
        },
        "isPreviewDOMLoaded": false,
        "IFrameDOM":[]
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


export const isPreviewDOMLoadedSelector = selector<boolean>({
    key:"isPreviewDOMLoadedSelector",
    get:({get})=>(get(SiteInfo).isPreviewDOMLoaded),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo =>({...prev,"isPreviewDOMLoaded":newValue}))
    }
})
export const IFrameDOMSelector = selector({
    key:"IFrameDOMSelector",
    get:({get})=>(get(SiteInfo).IFrameDOMSelector),
    set:({set,get,reset},newValue)=>{
        set(SiteInfo, (prev):SiteInfo =>({...prev,"IFrameDOMSelector":newValue}))
    }
})

export const UserIdState = selector({
    key:"UserIdState",
    get:({get})=>get(SiteInfo).userid,
    set:({get,set},newValue)=>{
        if(typeof newValue === "string"){
            set(SiteInfo,{...get(SiteInfo), "userid":newValue})
        }
    }
})

export const UserLoginPopupState = selector({
    key:"UserLoginPopupState",
    get:({get})=>get(SiteInfo).isLoginPopup,
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(SiteInfo,{...get(SiteInfo), "isLoginPopup":newValue})
        }
    }
})

export const UserLoginState = selector({
    key:"UserLoginState",
    get:({get})=>get(SiteInfo).isLogin,
    set:({get,set},newValue)=>{
        if(typeof newValue === "boolean"){
            set(SiteInfo,{...get(SiteInfo), "isLogin":newValue})
        }
    }
})