import React, { useEffect, useState,useRef, cloneElement } from "react";
import { forwardRef, ReactNode, RefObject } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BottomButton from "../../components/Styled/BottomButton";
import { alertSelector, alertTextSelector, codeSelector,IFrameDOMSelector, isPreviewDOMLoadedSelector, popupImageUploadSelector } from "../../recoils/pages";
import copyClipboard from "../../util/copyClipboard";
import ControlPaneContainer from "../ControlPane";
import ImageUploaderPopup from "../Popup/ImageUploader";
import runDOMController from "../../util/runDOMController";
import ImageUploader from "../ImageUpload/ImageUploader";
import { ChromePicker } from 'react-color';
import { useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";



const RenderControllPane = ()=>{

}

const GeneralContainer = forwardRef<HTMLIFrameElement,{selector:string, path:string, displaynone:boolean, componentid?:string}>((props,ref)=>{/* 일반 */
    const location = useLocation();


    const controlPaneRef = useRef<HTMLDivElement>(null);
    const [iframeDOM,setIframeDOM]:any[] = useRecoilState<any[]>(IFrameDOMSelector);
    const {selector, path, displaynone} = props;
    const [isPreviewDOMLoaded, setIsPreviewDOMLoaded] = useRecoilState<boolean>(isPreviewDOMLoadedSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    
    const doCopyClipboard = () => {
        if(ref !== null && ref!.current !== null){
            copyClipboard(((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML)
        }
    }
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const openImageUploaderPopup = () =>{
        setVisibleImageUploaderPopup({main:"flex"});
    }

useEffect(()=>{
    console.log(iframeDOM);
},[iframeDOM]);

type StyleMap = {
    font:{
        size:null | string,
        family:null | string,
        color:null | string,
        align:null | string,
    },
    box:{
        marginTop:null|string,
        marginLeft:null|string,
        marginRight:null|string,
        marginBottom:null|string,
        paddingTop:null|string,
        paddingLeft:null|string,
        paddingRight:null|string,
        paddingBottom:null|string,
        borderColor:null|string,
        borderTop:null|string,
        borderLeft:null|string,
        borderRight:null|string,
        borderBottom:null|string,
    },
    background:{
        backgroundImage:null | string,
        backgroundColor:null | string,
    }
}

    const createStyleMap = (styleData:string)=>{

        let newStyleMap : StyleMap = {
            font:{
                size:null,
                family:null,
                color:null,
                align:null,
            },
            box:{
                marginTop:null,
                marginLeft:null,
                marginRight:null,
                marginBottom:null,
                paddingTop:null,
                paddingLeft:null,
                paddingRight:null,
                paddingBottom:null,
                borderColor:null,
                borderTop:null,
                borderLeft:null,
                borderRight:null,
                borderBottom:null,
            },
            background:{
                backgroundImage:null,
                backgroundColor:null
            }
        };
        if(styleData === null || styleData === undefined) return newStyleMap;
        if(styleData !== "" || styleData !== undefined){
            styleData = styleData + ";";
            styleData.split(";").forEach((v, idx)=>{
                if(idx -1 === styleData.length) return;
                const [_name, _value]= v.split(":");
                if(_name === undefined || _value === undefined) return;
                const [name, value] = [_name.trim(), _value.trim()];
                
                switch(name){
                    case "font-family":
                        newStyleMap.font.family = value;
                    break;
                    case "font-size":
                        newStyleMap.font.size = value;
                    break;
                    case "color":
                        newStyleMap.font.color = value;
                    break;
                    case "text-align":
                        newStyleMap.font.align = value;
                    break;
                    
                    case "margin":
                        let marginValue = value.split(" ").length > 1 ? value.split(" ") : [value];
                        marginValue = marginValue.map(data => (data.indexOf("px") > -1 ? (data):(data+"px")))
                        if(marginValue.length == 1){
                            newStyleMap.box.marginTop    = marginValue[0];
                            newStyleMap.box.marginRight  = marginValue[0];
                            newStyleMap.box.marginBottom = marginValue[0];
                            newStyleMap.box.marginLeft   = marginValue[0];    
                        }
                        if(marginValue.length == 2){
                            newStyleMap.box.marginTop    = marginValue[0];
                            newStyleMap.box.marginRight  = marginValue[1];
                            newStyleMap.box.marginBottom = marginValue[0];
                            newStyleMap.box.marginLeft   = marginValue[1];    
                        }
                        if(marginValue.length == 3){
                            newStyleMap.box.marginTop    = marginValue[0];
                            newStyleMap.box.marginRight  = marginValue[1];
                            newStyleMap.box.marginBottom = marginValue[2];
                            newStyleMap.box.marginLeft   = marginValue[1];    
                        }
                        if(marginValue.length == 4){
                            newStyleMap.box.marginTop    = marginValue[0];
                            newStyleMap.box.marginRight  = marginValue[1];
                            newStyleMap.box.marginBottom = marginValue[2];
                            newStyleMap.box.marginLeft   = marginValue[3];    
                        }
                    break;
                    case "margin-top":
                        newStyleMap.box.marginTop = value;
                    break;
                    case "margin-right":
                        newStyleMap.box.marginRight = value;
                    break;
                    case "margin-bottom":
                        newStyleMap.box.marginBottom = value;
                    break;
                    case "margin-left":
                        newStyleMap.box.marginLeft = value;
                    break;

                    
                    case "padding":
                        let paddingValue = value.split(" ").length > 1 ? value.split(" ") : [value];
                        paddingValue = paddingValue.map(data => (data.indexOf("px") > -1 ? (data):(data+"px")))
                        if(paddingValue.length == 1){
                            newStyleMap.box.paddingTop    = paddingValue[0];
                            newStyleMap.box.paddingRight  = paddingValue[0];
                            newStyleMap.box.paddingBottom = paddingValue[0];
                            newStyleMap.box.paddingLeft   = paddingValue[0];    
                        }
                        if(paddingValue.length == 2){
                            newStyleMap.box.paddingTop    = paddingValue[0];
                            newStyleMap.box.paddingRight  = paddingValue[1];
                            newStyleMap.box.paddingBottom = paddingValue[0];
                            newStyleMap.box.paddingLeft   = paddingValue[1];    
                        }
                        if(paddingValue.length == 3){
                            newStyleMap.box.paddingTop    = paddingValue[0];
                            newStyleMap.box.paddingRight  = paddingValue[1];
                            newStyleMap.box.paddingBottom = paddingValue[2];
                            newStyleMap.box.paddingLeft   = paddingValue[1];    
                        }
                        if(paddingValue.length == 4){
                            newStyleMap.box.paddingTop    = paddingValue[0];
                            newStyleMap.box.paddingRight  = paddingValue[1];
                            newStyleMap.box.paddingBottom = paddingValue[2];
                            newStyleMap.box.paddingLeft   = paddingValue[3];    
                        }
                    break;
                    case "padding-top":
                        newStyleMap.box.paddingTop = value;
                    break;
                    case "padding-right":
                        newStyleMap.box.paddingRight = value;
                    break;
                    case "padding-bottom":
                        newStyleMap.box.paddingBottom = value;
                    break;
                    case "padding-left":
                        newStyleMap.box.paddingLeft = value;
                    break;


                    case "border":
                        
                        let borderValue = value.split(" ").length > 1 ? value.split(" ") : [value];
                        newStyleMap.box.borderColor = borderValue[3] ? borderValue[3] : "#000"
                        if(borderValue.length == 1){
                            borderValue[0] = borderValue[0].replace("px","")

                            newStyleMap.box.borderTop    = borderValue[0];
                            newStyleMap.box.borderRight  = borderValue[0];
                            newStyleMap.box.borderBottom = borderValue[0];
                            newStyleMap.box.borderLeft   = borderValue[0];    
                        }
                        if(borderValue.length == 2){
                            borderValue[0] = borderValue[0].replace("px","")
                            borderValue[1] = borderValue[1].replace("px","")

                            newStyleMap.box.borderTop    = borderValue[0];
                            newStyleMap.box.borderRight  = borderValue[1];
                            newStyleMap.box.borderBottom = borderValue[0];
                            newStyleMap.box.borderLeft   = borderValue[1];    
                        }
                        if(borderValue.length == 3){
                            borderValue[0] = borderValue[0].replace("px","")
                            borderValue[1] = borderValue[1].replace("px","")
                            borderValue[2] = borderValue[2].replace("px","")

                            newStyleMap.box.borderTop    = borderValue[0];
                            newStyleMap.box.borderRight  = borderValue[1];
                            newStyleMap.box.borderBottom = borderValue[2];
                            newStyleMap.box.borderLeft   = borderValue[1];    
                        }
                        if(borderValue.length == 4){
                            borderValue[1] = borderValue[1].replace("px","")
                            borderValue[2] = borderValue[2].replace("px","")
                            borderValue[3] = borderValue[3].replace("px","")
                            borderValue[4] = borderValue[4].replace("px","")

                            newStyleMap.box.borderTop    = borderValue[0];
                            newStyleMap.box.borderRight  = borderValue[1];
                            newStyleMap.box.borderBottom = borderValue[2];
                            newStyleMap.box.borderLeft   = borderValue[3];    
                        }
                        newStyleMap.box.borderTop    += "px solid "+newStyleMap.box.borderColor;
                        newStyleMap.box.borderRight  += "px solid "+newStyleMap.box.borderColor;
                        newStyleMap.box.borderBottom += "px solid "+newStyleMap.box.borderColor;
                        newStyleMap.box.borderLeft   += "px solid "+newStyleMap.box.borderColor;

                    break;
                    case "border-top":
                        let borderTop = value.split(" ").length > 1 ? value.split(" ") : [value];
                        borderTop[0] = borderTop[0].replace("px","")
                        newStyleMap.box.borderColor = borderTop[2] ? borderTop[2] : "#000"
                        newStyleMap.box.borderTop = borderTop[0] + "px solid "+newStyleMap.box.borderColor;
                    break;
                    case "border-right":
                        let borderRight = value.split(" ").length > 1 ? value.split(" ") : [value];
                        borderRight[0] = borderRight[0].replace("px","")
                        newStyleMap.box.borderColor = borderRight[2] ? borderRight[2] : "#000"
                        newStyleMap.box.borderRight = borderRight[0] + "px solid "+newStyleMap.box.borderColor;
                    break;
                    case "border-bottom":
                        let borderBottom = value.split(" ").length > 1 ? value.split(" ") : [value];
                        borderBottom[0] = borderBottom[0].replace("px","")
                        newStyleMap.box.borderColor = borderBottom[2] ? borderBottom[2] : "#000"
                        newStyleMap.box.borderBottom = borderBottom[0] + "px solid "+newStyleMap.box.borderColor;
                    break;
                    case "border-left":
                        let borderLeft = value.split(" ").length > 1 ? value.split(" ") : [value];
                        borderLeft[0] = borderLeft[0].replace("px","")
                        newStyleMap.box.borderColor = borderLeft[2] ? borderLeft[2] : "#000"
                        newStyleMap.box.borderLeft = borderLeft[0] + "px solid "+newStyleMap.box.borderColor;
                    break;

                    
                    case "background-image":
                        const backgroundImageUrl = v.split(":");
                        if(backgroundImageUrl.length > 1){
                            newStyleMap.background.backgroundImage = backgroundImageUrl[1].replace("url(","") + ":" + backgroundImageUrl[2].replace(")","");
                        }else{
                            newStyleMap.background.backgroundImage = backgroundImageUrl[0].replace("url(","").replace(")","");
                        }
                    break;
                    case "background-color":
                        newStyleMap.background.backgroundColor = value;
                    break;
                }
            })
        }

        return newStyleMap;
    }

    useEffect(()=>{
        try{
            setAlertFlag(true);
            setAlertText("DOM을 읽어서 쉽게 만드는 중입니다.")
            if(isPreviewDOMLoaded){
                const iframeDocument = (ref!.current as HTMLIFrameElement).contentDocument!;
                if(location.pathname.indexOf("/document") > -1){
                    iframeDocument.querySelector(".content-section")!.innerHTML = codeData;
                }else{
                    iframeDocument.querySelector(".content-section")!.innerHTML = `<div>${codeData}</div>`;
                }
                const testreturn = [...iframeDocument.querySelectorAll(".content-section *[data-target-control]")].map(element=>{  // 1. data-target-control을 찾음 
                    try{
                        const targetControl = element.dataset.targetControl;
                        const parentId = element.closest("div[data-0sid]")?.dataset["0sid"]
                        const title = element.closest("div[data-0stitle]")?.dataset["0stitle"]
                        const [name,target] = targetControl.split("_");
                        const targets = target.split("-");
                        const controlRef = null;
                        return [element,targets,name,parentId,controlRef,title]; // 1차 가공
    
                    }catch(error){
                        console.error(error);
                        return; // 1차 가공
                    }
                      
        
                });
                setAlertText("1차 가공 완료")
                let cnt = 0;
                const tempTotal: { key:number; element: any; target: any; name: any; style?: any; controlRef?:any}[] = [];
                testreturn.forEach((element)=>{ // 2. 평탄화 작업 시작
                    try{
    
                        if(element[1].length > 1){
                            element[1].forEach((ele:any) =>{
                                let styleObj={};
                                if(ele === "style"){
                                    styleObj = createStyleMap( element[0].getAttribute("style") ) 
                                    tempTotal.push({key:cnt, element: element[0], target: ele, name:element[2], parentId:element[3], controlRef:element[4], title:element[5], style:styleObj})
                                }else{
                                    tempTotal.push({key:cnt, element: element[0], target: ele, name:element[2], parentId:element[3], controlRef:element[4], title:element[5]})
                                }
                                cnt++;
                            })
                        }else{
                            
                            let styleObj={};
                            if(element[1][0] === "style"){
                                styleObj = createStyleMap( element[0].getAttribute("style") ) 
                                tempTotal.push({key:cnt, element: element[0], target: element[1][0], name:element[2], parentId:element[3], controlRef:element[4], title:element[5], style:styleObj})
                            }else{
                                tempTotal.push({key:cnt, element: element[0], target: element[1][0], name:element[2], parentId:element[3], controlRef:element[4], title:element[5]})
                            }
        
                        }
                        cnt++;
                    }catch(e){
                        console.error(e)
                    }
                })
                setAlertText("2차 가공 완료")
                setIframeDOM(tempTotal)
                
            }
            setAlertText("데이터 세팅 완료! <br> 웹페이지 편집을 위해서 확인을 눌러주세요!")
            setAlertFlag(false);
            console.log(iframeDOM);
            return ()=>{
                setAlertFlag(true);
                setAlertText("다시 목록으로 돌아갑니다~")
                setIsPreviewDOMLoaded(false);
            }
        }catch(e){
            console.error(e);
            setAlertText("DOM을 로드하다가 에러가 나버렸습니다. 뭐가 문제일까...<br>일단 새로고침 한번 해보시겠어요?")
            setTimeout(()=>{
           //     window.location.href="/"
            },1000);
            
        }

    },[isPreviewDOMLoaded,codeData])

    useEffect(()=>{
        return ()=>{
            setIframeDOM([])
        }
    },[])

    let beforeTitle = "";
    const createTitle = (name) => {
        if(beforeTitle !== name){
            beforeTitle = name;
            return (<div className='group-title'>
                <hr></hr>
                <h2>- {name}</h2>
            </div>)
        }else{
            return <></>;
        }
    }
    let beforeBigTitle = "";
        const createBigTitle = (name) => {
            if(name === undefined) return <></>
            if(beforeBigTitle !== name){
                beforeBigTitle = name;
                return (<div className='component-group-title'>
                    <hr></hr>
                    <h2>{name}</h2>
                </div>)
            }else{
                return <></>;
            }
        }
        
        const changeStyle = ( {key,element, 
                              type, target ,value, 
                              callback})=>{
            let newIframeDOM = [...iframeDOM];
            return (newIframeDOM.map(data => {
                if(data.key === key){
                    data = {...data, style : {...data.style, [type]:{ ...(data.style[type]), [target]:value}}};
                    if(element.style){
                        callback();
                    }
                }
                return data;
            }))
        }

    const ChangeAttributeIframeDom = (e,key) =>{

        setIframeDOM(iframeDOM.map((ele)=>{                                        
            if(ele.key === key){  
                const obj = {...ele, value:""}      
                obj["value"] = e.target.value;
                return obj;
            }
            return ele;
        }))
    }
    const testCheck = ()=>{
        document.querySelectorAll("textarea").forEach(element=>{
            element.click();
        })
        document.querySelectorAll("input[type='text']").forEach(element=>{
            element.click();
        })
        document.querySelectorAll("input[type='range']").forEach(element=>{
            element.click();
        })
    }
    return (
        <div>
            <ImageUploaderPopup/>
            <ControlPaneContainer copyCode={doCopyClipboard} ImageUploader={openImageUploaderPopup} displaynone={displaynone}>
                <div className="general">
                    {
                        iframeDOM && iframeDOM.map((data:any, idx:any)=>{
                            const {element,target,name,style,key,parentId, controlRef,title} = data;
                            testCheck(element);
                            switch(target){
                                case "href":
                                return (
                                    <div>
                                        
                                        {createBigTitle(title)}
                                        {createTitle(name)}
                                        <div className="row-two">
                                            <div>
                                                <span className="content-title">링크 주소</span>
                                            </div>
                                            <div>                                                
                                                <textarea  className='input' type='text' 
                                                onClick={(e)=>{
                                                        if(element.href !== e.target.value){
                                                            e.target.value = element.href
                                                        }
                                                    }}
                                                
                                                defaultValue={element.href} className="control-input" onKeyUp={(e)=>{
                                                    element.href = e.target.value;
                                                }}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    )

                                case "text":             
                                    return (
                                    <div>
                                        
                                        {createBigTitle(title)}
                                        {createTitle(name)}
                                        <div className="row-two">
                                            <div>
                                                <span className="control-title">텍스트</span>
                                            </div>
                                            <div>
                                                <textarea 
                                            defaultValue={element.innerText} className="control-input" data-parentId={parentId}
                                            
                                            onClick={(e)=>{
                                                if(element.innerText !== e.target.value){
                                                    e.target.value = element.innerText
                                                }
                                            }}
                                            onChange={(e)=>{
                                                element.innerText = e.target.value;
                                                
                                                e.currentTarget.style.height = "12px";
                                                e.currentTarget.style.height = (e.currentTarget.scrollHeight)+"px";
                                            }}

                                            onFocus={(e)=>{                                            
                                                e.currentTarget.style.height = "12px";
                                                e.currentTarget.style.height = (e.currentTarget.scrollHeight)+"px";

                                            }}></textarea>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    )
                                
                                 
                                case "img":          
                                    return (
                                    <div>
                                        
                                        {createBigTitle(title)}
                                        {createTitle(name)}
                                        <div className="row-two">
                                            <div>
                                                <span className="control-title">이미지</span>
                                            </div>
                                            <div>
                                                <ImageUploader onImageChange={(data:any)=>{
                                                    element.src = data.imageUrl
                                                }}></ImageUploader>
                                            </div>
                                        
                                        
                                            </div>
                                        {/* <input type='text' defaultValue={element.src} className="control-input" onKeyUp={(e)=>{
                                            element.src = e.target.value;
                                        }}></input> */}
                                    </div>
                                    )          
                                                
                                case "src":          
                                    return (
                                    <div>
                                        
                                        {createBigTitle(title)}
                                        {createTitle(name)}
                                        <div className="row-two">
                                            <div>
                                                <span className="control-title">리소스 위치</span>
                                            </div>
                                            <div>
                                                <textarea type='text' 
                                                    onClick={(e)=>{
                                                        if(element.src !== e.target.value){
                                                            e.target.value = element.src
                                                        }
                                                    }}
                                                    defaultValue={element.src} className="control-input" onKeyUp={(e)=>{
                                                        element.src = e.target.value;
                                                }}></textarea>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    )                        

                                case "style":
                                    function isExistGroup(obj:any){
                                        for(let a in obj){
                                            if(obj[a] !== null){
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    return (
                                        <div className="style-component">
                                            
                                        {createBigTitle(title)}
                                            {createTitle(name)}
                                            <div className="style-group">
                                                <div>
                                                <span className="control-title">스타일 코드</span>
                                                </div>
                                                <div className="style-control">
                                                    {style && style.font && isExistGroup(style.font) && (<div>
                                                        <h3>폰트</h3>
                                                        
                                                        {style.font.family !== null && style.font.family !==undefined && (<ul>
                                                            <li>
                                                                <div className="row-two">
                                                                    <div>
                                                                        <span className="control-title">종류</span>
                                                                    </div>
                                                                    <div>
                                                                        <input type="text" onChange={(e)=>{
                                                                            const fontFamily = e.target.value;
                                                                            setIframeDOM(changeStyle({
                                                                                key,element,
                                                                                type:"font",target:"family",value:fontFamily,
                                                                                callback:()=>{
                                                                                    element.style.fontFamily = fontFamily;
                                                                                }
                                                                            }))
                                                                        }}></input>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>)}
                                                        {style.font.size !== null && (<ul>
                                                            <li>
                                                                <div className="row-two">
                                                                    <div>
                                                                        <span className="control-title">크기</span>
                                                                    </div>
                                                                    <div>
                                                                    {typeof style.font.size === 'string' && <input className="inputViewer" type="text" value={style.font.size.replace("px","")*1}/>}
                                                                    {typeof style.font.size === 'string' && <input type="range" min="1" max="100" defaultValue={style.font.size.replace("px","")*1} onChange={(e)=>{
                                                                        const fontSize = e.target.value+"px";
                                                                        setIframeDOM(changeStyle({
                                                                            key,element,
                                                                            type:"font",target:"size",value:fontSize,
                                                                            callback:()=>{
                                                                                element.style.fontSize = fontSize;
                                                                            }
                                                                        }))
                                                                    }}/>}
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                            </li>
                                                        </ul>)}
                                                        {style.font.color !== null && style.font.color !==undefined && (<ul>
                                                            <li>
                                                                <div className="row-two">
                                                                    <div>
                                                                        <span className="control-title">색상</span>
                                                                    </div>
                                                                    <div>
                                                                        <ChromePicker
                                                                        color={style.font.color}
                                                                        onChange={(color)=>{
                                                                            const fontColor = color.hex;
                                                                            setIframeDOM(changeStyle({
                                                                                key,element,
                                                                                type:"font",target:"color",value:fontColor,
                                                                                callback:()=>{
                                                                                    element.style.color = fontColor;
                                                                                }
                                                                            }))
                                                                        }}/>
                                                                    </div>
                                                                </div>
                                                               
                                                                
                                                            </li>
                                                        </ul>)}
                                                        {style.font.align !== null && style.font.align !==undefined && (<ul>
                                                            <li>
                                                                <div className="row-two">
                                                                    <div>
                                                                        <span className="control-title">정렬</span>
                                                                    </div>
                                                                    <div>

                                                                        <select onChange={(e)=>{
                                                                            const textAlign = e.target.value;
                                                                            setIframeDOM(changeStyle({
                                                                                key,element,
                                                                                type:"font",target:"align",value:textAlign,
                                                                                callback:()=>{
                                                                                    element.style.textAlign = textAlign;
                                                                                }
                                                                            }))
                                                                            }}>
                                                                            <option value="">없음</option>
                                                                            <option value="left">좌측</option>
                                                                            <option value="center">중앙</option>
                                                                            <option value="right">우측</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                
                                                            </li>
                                                        </ul>)}
                                                    </div>)}

                                                    {style && style.box && isExistGroup(style.box) && <div>
                                                    <h3>박스</h3>
                                                    <ul>
                                                        {style.box.marginTop !== null   && style.box.marginTop !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">마진 - 상단</span></div>
                                                                <div> <input className="inputViewer" type="text" value={style.box.marginTop.replace("px","")*1}/>
                                                                <input type="range" min="0" max="100" defaultValue={style.box.marginTop.replace("px","")} onChange={(e)=>{
                                                                    const marginTop = e.target.value + "px";
                                                                    setIframeDOM(changeStyle({
                                                                        key,element,
                                                                        type:"box",target:"marginTop",value:marginTop,
                                                                        callback:()=>{
                                                                            element.style.marginTop = marginTop;
                                                                        }
                                                                    }))
                                                                }}/> </div>
                                                            </div>
                                                                
                                                               
                                                            </li>
                                                        )}
                                                        {style.box.marginRight !== null && style.box.marginRight !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">마진 - 우측</span></div>
                                                                <div> <input className="inputViewer" type="text" value={style.box.marginRight.replace("px","")*1}/>
                                                                <input type="range" min="0" max="100" defaultValue={style.box.marginRight.replace("px","")} onChange={(e)=>{
                                                                    const marginRight = e.target.value + "px";
                                                                    setIframeDOM(changeStyle({
                                                                        key,element,
                                                                        type:"box",target:"marginRight",value:marginRight,
                                                                        callback:()=>{
                                                                            element.style.marginRight = marginRight;
                                                                        }
                                                                    }))
                                                                }}/></div>
                                                            </div>
                                                                
                                                               
                                                            </li>
                                                        )}
                                                        {style.box.marginBottom !== null && style.box.marginBottom !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">마진 - 하단</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.marginBottom.split(" ")[0].replace("px","")*1}/>
                                                                <input type="range" min="0" max="100" defaultValue={style.box.marginBottom.split(" ")[0].replace("px","")} onChange={(e)=>{
                                                                    const marginBottom = e.target.value + "px";
                                                                    setIframeDOM(changeStyle({
                                                                        key,element,
                                                                        type:"box",target:"marginBottom",value:marginBottom,
                                                                        callback:()=>{
                                                                            element.style.marginBottom = marginBottom;
                                                                        }
                                                                    }))
                                                                }}/></div>
                                                            </div>
                                                                
                                                                
                                                            </li>
                                                        )}
                                                        {style.box.marginLeft !== null  && style.box.marginLeft !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div>
                                                                <span className="control-title">마진 - 좌측</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.marginLeft.replace("px","")*1}/>
                                                                <input type="range" min="0" max="100" defaultValue={style.box.marginLeft.replace("px","")} onChange={(e)=>{
                                                                    const marginLeft = e.target.value + "px";
                                                                    setIframeDOM(changeStyle({
                                                                        key,element,
                                                                        type:"box",target:"marginLeft",value:marginLeft,
                                                                        callback:()=>{
                                                                            element.style.marginLeft = marginLeft;
                                                                        }
                                                                    }))
                                                                }}/></div>
                                                            </div>
                                                                
                                                            </li>
                                                        )}
                                                    </ul>

                                                    <ul>
                                                    {style.box.borderColor !== null && style.box.borderColor !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div>
                                                            <span className="control-title">테두리 - 색상</span></div>
                                                                <div><ChromePicker
                                                                color={style.box.borderColor}
                                                                onChange={(color)=>{
                                                                    const borderColor = color.hex;
                                                                    setIframeDOM(changeStyle({
                                                                        key,element,
                                                                        type:"box",target:"borderColor",value:borderColor,
                                                                        callback:()=>{
                                                                            element.style.borderColor = borderColor;
                                                                        }
                                                                    }))
                                                                }}/></div>
                                                            </div>
                                                            

                                                            </li>
                                                            )}
                                                    {style.box.borderTop !== null && style.box.borderTop !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div> <span className="control-title">테두리 - 상단</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.borderTop.split(" ")[0].replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.borderTop.split(" ")[0].replace("px","")*1} onChange={(e)=>{
                                                                const borderTop = e.target.value;
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"borderTop",value:borderTop,
                                                                    callback:()=>{
                                                                        const color = iframeDOM.filter(data => data.element === element)?.find(data => data.style)?.style.box.borderColor;
                                                                        element.style.borderTop = borderTop + "px solid "+color;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                           
                                                            

                                                            </li>
                                                            )}
                                                            
                                                    {style.box.borderRight !== null && style.box.borderRight !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">테두리 - 우측</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.borderRight.split(" ")[0].replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.borderRight.split(" ")[0].replace("px","")*1} onChange={(e)=>{
                                                                const borderRight = e.target.value;
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"borderRight",value:borderRight,
                                                                    callback:()=>{
                                                                        const color = iframeDOM.filter(data => data.element === element)?.find(data => data.style)?.style.box.borderColor;
                                                                        element.style.borderRight = borderRight + "px solid "+color;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                            
                                                            

                                                            </li>
                                                            )}
                                                            
                                                    {style.box.borderBottom !== null && style.box.borderBottom !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">테두리 - 하단</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.borderBottom.split(" ")[0].replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.borderBottom.split(" ")[0].replace("px","")*1} onChange={(e)=>{
                                                                const borderBottom = e.target.value;
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"borderBottom",value:borderBottom,
                                                                    callback:()=>{
                                                                        const color = iframeDOM.filter(data => data.element === element)?.find(data => data.style)?.style.box.borderColor;
                                                                        element.style.borderBottom = borderBottom + "px solid "+color;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                            
                                                            

                                                            </li>
                                                            )}
                                                            
                                                    {style.box.borderLeft !== null && style.box.borderLeft !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">테두리 - 좌측</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.borderLeft.split(" ")[0].replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.borderLeft.split(" ")[0].replace("px","")*1} onChange={(e)=>{
                                                                const borderLeft = e.target.value;
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"borderLeft",value:borderLeft,
                                                                    callback:()=>{
                                                                        const color = iframeDOM.filter(data => data.element === element)?.find(data => data.style)?.style.box.borderColor;
                                                                        element.style.borderLeft = borderLeft + "px solid "+color;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                            
                                                            

                                                            
                                                            </li>
                                                            )}
                                                    </ul>

                                                    <ul>

                                                        
                                                    {style.box.paddingTop !== null && style.box.paddingTop !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">패딩 - 상단</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.paddingTop.replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.paddingTop} onChange={(e)=>{
                                                                const paddingTop = ((e.target.value) ? e.target.value : 0)+"px";
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"paddingTop",value:paddingTop,
                                                                    callback:()=>{
                                                                        element.style.paddingTop = paddingTop;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                            
                                                            


                                                            </li>
                                                            )}

                                                            
                                                    {style.box.paddingRight !== null && style.box.paddingRight !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">패딩 - 우측</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.paddingRight.replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.paddingRight} onChange={(e)=>{
                                                                const paddingRight = ((e.target.value) ? e.target.value : 0)+"px";
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"paddingRight",value:paddingRight,
                                                                    callback:()=>{
                                                                        element.style.paddingRight = paddingRight;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                            
                                                            


                                                            </li>
                                                            )}

                                                            
                                                    {style.box.paddingBottom !== null && style.box.paddingBottom !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">패딩 - 하단</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.paddingBottom.replace("px","")*1}/>
                                                            <input type="range" min="0" max="100" defaultValue={style.box.paddingBottom} onChange={(e)=>{
                                                                const paddingBottom = ((e.target.value) ? e.target.value : 0)+"px";
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"paddingBottom",value:paddingBottom,
                                                                    callback:()=>{
                                                                        element.style.paddingBottom = paddingBottom;
                                                                    }
                                                                }))
                                                            }}/></div>
                                                            </div>
                                                            
                                                            


                                                            </li>
                                                            )}


                                                            
                                                    {style.box.paddingLeft !== null && style.box.paddingLeft !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div>
                                                            <span className="control-title">패딩 - 좌측</span></div>
                                                                <div><input className="inputViewer" type="text" value={style.box.paddingLeft.replace("px","")*1}/>
                                                            <input type="range" min="1" max="100" defaultValue={style.box.paddingLeft} onChange={(e)=>{
                                                                const paddingLeft = ((e.target.value) ? e.target.value : 0)+"px";
                                                                setIframeDOM(changeStyle({
                                                                    key,element,
                                                                    type:"box",target:"paddingLeft",value:paddingLeft,
                                                                    callback:()=>{
                                                                        element.style.paddingLeft = paddingLeft;
                                                                    }
                                                                }))
                                                            }}/>
</div>
                                                            </div>
                                                            
                                                            
                                                            </li>
                                                            )}
                                                    </ul>
                                                    </div>}

                                                    {style && style.background && isExistGroup(style.background) && <div>
                                                    <h3>배경</h3>
                                                    <ul>
                                                        {style.background.backgroundImage !== null   && style.background.backgroundImage !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div><span className="control-title">이미지</span></div>
                                                                <div><ImageUploader onImageChange={(data:any)=>{
                                                                    setIframeDOM(changeStyle({
                                                                        key,element,
                                                                        type:"background",target:"backgroundImage",value:data.imageUrl,
                                                                        callback:()=>{
                                                                            element.style.backgroundImage = `url(${data.imageUrl})`;
                                                                        }
                                                                    }))
                                                                }}></ImageUploader></div>
                                                            </div>
                                                                
                                                                
                                                            </li>
                                                        )}

                                                        
                                                        {style.background.backgroundColor !== null   && style.background.backgroundColor !==undefined && (
                                                            <li>
                                                            <div className="row-two">
                                                                <div>
                                                                <span className="control-title">색상</span></div>
                                                                <div> <ChromePicker
                                                                    color={style.background.backgroundColor}
                                                                    onChange={(color)=>{
                                                                        const backgroundColor = color.hex;
                                                                        setIframeDOM(changeStyle({
                                                                            key,element,
                                                                            type:"backgroundColor",target:"backgroundColor",value:backgroundColor,
                                                                            callback:()=>{
                                                                                element.style.backgroundColor = backgroundColor;
                                                                            }
                                                                        }))
                                                                    }}/></div>
                                                            </div>
                                                               
                                                            </li>
                                                        )}
                                                    </ul>
                                                    </div>}                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )
                            
                                case "class":
                                    return (
                                    <div>
                                        
                                        {createBigTitle(title)}
                                        {createTitle(name)}
                                        <span className="control-title">클래스명</span>
                                        <input type='text' defaultValue={element.getAttribute("class")} className="control-input" onKeyUp={(e)=>{
                                            element.setAttribute("class", e.target.value);       
                                        }}></input>
                                    </div>
                                    )

                                case "clone":
                                    return (
                                    <div>
                                        
                                        {createBigTitle(title)}
                                        {createTitle(name)}
                                        <div className="row-two">
                                        <div><span className="control-title">추가하기</span></div>
                                        <div><button className="control-input" onClick={(e)=>{
                                            const cloneTarget = element.cloneNode(true);
                                            element.parentElement.append(cloneTarget);
                                            setCodeData(((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML);
                                            let newIframeDOM = iframeDOM
                                            const targetName = "New "+name+ (newIframeDOM.length+1);
                                            element.dataset.targetControl.split("_")[1].split("-").forEach((targetname:string)=>{
                                                if(targetname !== "clone"){
                                                    newIframeDOM = ([...iframeDOM, {key:newIframeDOM.length+1, element:cloneTarget, data, target:targetname, name:targetName, style:iframeDOM.filter(data => data.element === element)?.find(data => data.style)?.style
                                                        ,parentId, controlRef, title
                                                    }])
                                                }
                                            })
                                            setIframeDOM(newIframeDOM);
                                            setIsPreviewDOMLoaded(true);
                                        }}>+</button></div>
                                        </div>
                                        
                                        
                                    </div>
                                    )
    
                                default:
                                    return <div>
                                        지원불가
                                    </div>
                                break;
                            }
                            
                            
                        })

                    }
                </div>
            </ControlPaneContainer>
        </div>
    )
    
})
export default GeneralContainer;