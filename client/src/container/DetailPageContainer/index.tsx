import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT } from "../../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, codeSelector, IdSelector, pathSelector, selectorSelector } from "../../recoils/pages";
import PreviewContainer from "../Preview";
import GeneralContainer from "./general";
import DevContainer from "./dev";
import styled from "styled-components";

const DetailPageContainer = ({pageType}:{pageType:("general" | "dev")})=>{
    const param = useParams<string>();
    const iframe = useRef<HTMLIFrameElement>(null);
    const [idState,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const {id}=param;
    useEffect(()=>{
        setIdState(id as string);
    },[id]);
    const {isSuccess,data} = useQuery([QueryKeys.CONTENT,"view",id], ()=>graphqlFetcher(GET_CONTENT,{id}),{
        onSuccess:({content})=>{
            const [{content:code,selector,path}] = content;
            if(content.length > 0){
                setAlertText("데이터를 세팅 성공!");
                setCodeData(code);
                setSelector(selector);
                setPath(path);
                setAlertFlag(false);
            }else{
                setAlertText("오잉 데이터가 도착했는데 아무것도 없네요?");
                throw Error("저런 에러가 났어요..");
            }
    },onError:(e)=>{
        setAlertText("저런 에러가 났어요");    
        throw Error("저런 에러가 났어요")
    },retry:1})

    useEffect(()=>{
        setAlertFlag(true);
        setAlertText("데이터를 세팅하고 있습니다.");    
        
    },[])

    useEffect(()=>{
        console.log(data)
    },[data])
//     <DetailPageComponent>
//     <PreviewContainer isSuccess={isSuccess} ref={iframe} selector={selector} path={path}/>
//     {pageType=== "general" ? (
//         <GeneralContainer ref={iframe}></GeneralContainer>
//     ): pageType ==="dev" ? (
//         <DevContainer ref={iframe} data={data}></DevContainer>
//     ):(<div>Type ERROR</div>)}
// </DetailPageComponent>


    const ResizeLayout = styled.div`
        
    `
    const ResizeLayoutFrame = styled.div`
        position:relative; width:${prop => prop.width}%; height:100%;
    `
    const ResizeLayoutFrameDimmed = styled.div`
        position:absolute; top:0; left:0; width:100%; height:100%; background:${prop => prop.color}; opacity:0.5; 
    `
    const ResizeLayoutHandle = styled.div`
        position:fixed; top:0; left:calc(${prop => prop.positionX}% - 20px); width:20px; height:100%; background-color:#45675b 
    `
    const handle = useRef<HTMLDivElement>(null)
    const [positionX, setPositionX] = useState<number>(70);
    const [flag, setFlag] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(true);
    const MouseMoveEvent = (e)=>{
        const {clientWidth, clientHeight} = document.body
        const {pageX, pageY} = e
        if(flag){
            setPositionX(((pageX-10)/clientWidth) * 100);
        }
    }

    const TouchMoveEvent = (e)=>{
        const {clientWidth, clientHeight} = document.body
        const {clientX, ClientY} = e.changedTouches[0]
        if(flag){
            setPositionX(((clientX-10)/clientWidth) * 100);
        }
    }
    const MouseDownEvent = ()=>{
        handle.current.style.cursor = "col-resize"
        setFlag(true)
        setShow(false)
    }

    const TouchStartEvent = ()=>{
        handle.current.style.cursor = "col-resize"
        setFlag(true)
        setShow(false)
    }

    const MouseUpEvent = ()=>{
        handle.current.style.cursor = "default"
        setFlag(false)
        setShow(true)
    }
    if(isSuccess){
        const {content:[{selector,path}]}= data;
        return (
            <div className="resize-layout" onMouseMove={MouseMoveEvent} onTouchMove={TouchMoveEvent}  onMouseUp={MouseUpEvent}>
                <div className="frame"  style={{width:`${positionX}%`}}>
                    <PreviewContainer isSuccess={isSuccess} ref={iframe} selector={selector} path={path} show={show}/>
                    <div className="preview-load" style={{"display":(show)?"none":"flex"}}>
                        <span>
                            화면 이동 중입니다!
                        </span>
                    </div>
                </div>
                <div className="handle" ref={handle} style={{left:`${positionX}%`}} 
                    onTouchStart={MouseDownEvent} 
                    onTouchMove={MouseMoveEvent} 
                    onTouchEnd={MouseUpEvent} 
                    onMouseDown={MouseDownEvent} 
                    onMouseUp={MouseUpEvent} onMouseOver={()=>{
                    handle.current.style.cursor = "col-resize"
                }}></div>
                <div className="frame" style={{width:`${100-positionX}%`}} >
                    {pageType=== "general" ? (
                        <GeneralContainer ref={iframe} selector={selector} path={path}></GeneralContainer>
                    ): pageType ==="dev" ? (
                        <DevContainer ref={iframe} data={data}></DevContainer>
                    ):(<div>Type ERROR</div>)}
                </div>
            </div>
        )

    }else{
        return <div></div>;
    }



}
export default DetailPageContainer;