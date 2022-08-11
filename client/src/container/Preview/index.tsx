import React, { useCallback } from "react";
import { ForwardedRef, forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeSelector } from "../../recoils/pages";
import runDOMController from "../../util/runDOMController";


const PreviewContainer = forwardRef<HTMLIFrameElement,{isSuccess:boolean, selector:string, path:string}>((props,ref)=>{
    const {isSuccess, selector, path} = props;
    if(selector === undefined || path === undefined){
        return <div>Loading...</div>
    }
    const codeData = useRecoilValue<string>(codeSelector);
    const applyCodeOnIframe = ({isDOMController}:{isDOMController?:Boolean}) =>{
        const iframeDocument = (ref!.current as HTMLIFrameElement).contentDocument!;
        iframeDocument.querySelector(selector)!.innerHTML = codeData;
        if(isDOMController){
            runDOMController(iframeDocument)
        }
    }
    const initializePage = useCallback(() =>{
        applyCodeOnIframe({isDOMController:true});    
    },[])

    useEffect(()=>{
        if(isSuccess){
            ref.current.addEventListener("load",initializePage)
            return ()=>{
                try{
                    (ref.current as HTMLIFrameElement).removeEventListener("load",initializePage);
                }catch(e){

                }
            }
        }
    },[isSuccess]);

    return <div className='preview'><iframe src={path} ref={ref}></iframe></div>
})

export default PreviewContainer;