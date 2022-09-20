import React, { useCallback } from "react";
import { ForwardedRef, forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeSelector, isPreviewDOMLoadedSelector } from "../../recoils/pages";

/*
    PreviewContainer
    - 설명 : 미리보기 페이지 컨테이너 입니다.
    - iframe에서 페이지 로드를 받으면 runDOMController을 통해 컨트롤을 만듭니다.
*/
const PreviewContainer = forwardRef<HTMLIFrameElement,{isSuccess:boolean, selector:string, path:string, show:boolean}>((props,ref)=>{
    const {isSuccess, selector, path} = props;
    if(selector === undefined || path === undefined){ // 케이스 1 : 아무것도 없을 경우, 로드가 안된걸로 처리. (iframe의 src와 selector를 둘 다 받아야함!)
        return <div>Loading...</div>
    }
    const codeData = useRecoilValue<string>(codeSelector);
    const [isPreviewDOMLoaded, setIsPreviewDOMLoaded] = useRecoilState<boolean>(isPreviewDOMLoadedSelector);
    //console.log(codeData);
    // const applyCodeOnIframe = ({isDOMController}:{isDOMController?:Boolean}) =>{
    //     const iframeDocument = (ref!.current as HTMLIFrameElement).contentDocument!;
    //     iframeDocument.querySelector(selector)!.innerHTML = codeData;
    //     if(isDOMController){
    //         setIsPreviewDOMLoaded(true);
    //         //runDOMController(iframeDocument)
    //     }
    // }
    const initializePage = useCallback(() =>{
//        debugger;
        setIsPreviewDOMLoaded(true);
       // applyCodeOnIframe({isDOMController:true});    
    },[])

    useEffect(()=>{
        if(isSuccess){ // 케이스2 : 성공할 경우
            ref.current.addEventListener("load",initializePage)
            return ()=>{
                try{
                    (ref.current as HTMLIFrameElement).removeEventListener("load",initializePage);
                }catch(e){

                }
            }
        }
    },[isSuccess]);

    return (
        <div className='preview'>
            <iframe src={path} ref={ref} style={{"display":(props.show)?"block":"none"}}></iframe>
        </div>
    )
})

export default PreviewContainer;