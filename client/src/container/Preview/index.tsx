import { ForwardedRef, forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeSelector } from "../../recoils/pages";
import runDOMController from "../../util/runDOMController";


const PreviewContainer = forwardRef<HTMLIFrameElement,{isFetched:boolean}>((props,ref)=>{
    const {isFetched} = props;
    const codeData = useRecoilValue<string>(codeSelector);
    const applyCodeOnIframe = ({isDOMController}:{isDOMController?:Boolean}) =>{
        const iframeDocument = (ref!.current as HTMLIFrameElement).contentDocument!;
        iframeDocument.querySelector(".content-section")!.innerHTML = codeData;
        if(isDOMController){
            runDOMController(iframeDocument)
        }
    }
    const initializePage = () =>{
        applyCodeOnIframe({isDOMController:true});    
    }

    useEffect(()=>{
        if(isFetched){
            ref.current.addEventListener("load",initializePage.bind(this))
            return ()=>{
                try{
                    (ref.current as HTMLIFrameElement).removeEventListener("load",initializePage.bind(this));
                }catch(e){

                }
            }
        }
    },[isFetched]);

    return <div className='preview'><iframe src="/public/cos.html" ref={ref}></iframe></div>
})

export default PreviewContainer;