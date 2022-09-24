import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT, GET_CONTENT_PATH } from "../../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, codeSelector, currentTargetState, IdSelector, pathSelector, selectorSelector,isPreviewDOMLoadedSelector } from "../../recoils/pages";
import PreviewContainer from "../Preview";
import GeneralContainer from "./general";
import DevContainer from "./devDocument";
import styled from "styled-components";
import { ADD_DOCUMENT, GET_DOCUMENT } from "../../graphql/documents";
import useResizeHooks from "../../lib/useResize";
import { ReactSortable } from "react-sortablejs";

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


const loadComponentList = (path:any)=>{
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const {isSuccess:isSuccessComponent,data:loadedComponentlist,refetch:loadedComponentRefetch} = useQuery([QueryKeys.CONTENT,"view","componentlist",path], ()=>graphqlFetcher(GET_CONTENT_PATH,{path}),{
        onSuccess:({contentspath})=>{
        },onError:(e)=>{
        setAlertText("저런 에러가 났어요");    
        console.error(e);
        throw Error("저런 에러가 났어요");
    },retry:1})
    return [isSuccessComponent, loadedComponentlist,loadedComponentRefetch];
}
const DetailPageContainer = ({pageType}:{pageType:("general" | "dev")})=>{
    const param = useParams<string>();
    const iframe = useRef<HTMLIFrameElement>(null);
    const [idState,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const [currentTarget, setDataTarget] = useRecoilState(currentTargetState)
    const [handle,positionX,setPositionX,flag,setFlag,show,setShow,MouseMoveEvent,TouchMoveEvent,MouseDownEvent,TouchStartEvent,MouseUpEvent] = useResizeHooks();
    const [isPreviewDOMLoaded, setIsPreviewDOMLoaded] = useRecoilState<boolean>(isPreviewDOMLoadedSelector);

    const {id}=param;
    useEffect(()=>{
        setIdState(id);
    },[id]);
    useEffect(()=>{
        loadedComponentRefetch()
    },[path])

    const [isSuccessComponent, loadedComponentlist, loadedComponentRefetch] = loadComponentList(path);
    const numberId = parseInt(id,10);

    const {isSuccess,data,refetch} = useQuery([QueryKeys.CONTENT,"view","document",numberId], ()=>graphqlFetcher(GET_DOCUMENT,{id:numberId}),{
        onSuccess:({document})=>{
            const [{document:code,selector,path,author}] = document;
                if(document.length > 0){
                    setAlertText("데이터를 세팅 성공!");
                    setCodeData(code);
                    setSelector(".content-section");
                    setPath(path);
//                    setAuthor(author);
                    setAlertFlag(false);
                }else{
                    setAlertText("오잉 데이터가 도착했는데 아무것도 없네요?");
                    throw Error("저런 에러가 났어요..");
                }

    },onError:(e)=>{
        setAlertText("저런 에러가 났어요");    
        console.error(e);
        throw Error("저런 에러가 났어요");
    },retry:1})
    useEffect(()=>{
        setAlertFlag(true);
        setAlertText("데이터를 세팅하고 있습니다.");    
    },[])


    useEffect(()=>{
        console.log(data)
    },[data])

    const [loadedComponentList, setLoadedComponentList] = useState([]);
    const [componentList, setComponentList] = useState([]);
    const [newArray, setNewArray] = useState([]);
    useEffect(()=>{
        setLoadedComponentList(loadedComponentlist);
    },[loadedComponentlist])
    useEffect(()=>{
        let newArray = []
        if(componentList.length > 0){
            iframe.current?.contentDocument?.querySelectorAll(".content-section > div").forEach((section,idx)=>{
                if(section.outerHTML.indexOf("testos") > -1){
                    debugger
                }
                newArray = [...newArray,{...componentList[idx], content:section.outerHTML}]
            })
        //    setComponentList(newArray);    
        }
        setComponentList(newArray);

    },[codeData])
    useEffect(()=>{

        if(componentList && componentList.length > 0){
            setCodeData(componentList.reduce((init,value)=>{
                init += value.content;
                return init;
            },""))
            setIsPreviewDOMLoaded(true)
    
        }
    },[componentList])
    if(isSuccess){

        const {document:[{selector,path}]}= data;
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
                    <div className="document-editor" style={{paddingLeft:'20px'}}>
                        <ul>
                            <li>
                                <h2>1. 사용할 기본 템플릿을 선택해주세요.</h2>
                                <select onChange={(e)=>{
                                    switch(e.target.value){
                                        case "cos":
                                            setPath("/global/cos.html")
                                        break;
                                        case "aos":
                                            setPath("/global/aos.html")
                                        break;
                                        case "더현대-PC":
                                            alert("추후 개발 예정");
                                        break;
                                        case "더현대-MO":
                                            alert("추후 개발 예정");
                                        break;
                                        default:
                                            alert("추후 개발 예정");
                                        break;
                                    }
                                }}>
                                    <option value="">없음</option>
                                    <option value="cos">COS</option>
                                    <option value="aos">AOS</option>
                                    <option value="thehyundai">THEHYUNDAI</option>
                                    <option value="nanushka">Nanushka</option>
                                </select>
                            </li>
                            <li className="accodian">
                                <h2>2. 사용할 컴포넌트를 추가해주세요</h2>
                                <div className="content">
                                    
                                    <ul>
                                        {isSuccessComponent && loadedComponentList && loadedComponentlist.contentspath.map(({id:componentId,title,content})=>(
                                            <li>{title} <button onClick={e=>{
                                                setComponentList([...componentList, {id:componentList.length,componentId,title,content}])
                                            }}>추가</button></li>
                                            ))}
                                    </ul>
                                    <input onChange={(e)=>{
                                        setSelector(e.target.value)
                                    }}></input>
                                </div>
                            </li>
                            <li className="accodian">
                                <h2>3. 컴포넌트의 순서를 결정해주세요.</h2>
                                <div className="content">
                                    <ReactSortable list={componentList} setList={setComponentList}>
                                        {componentList.map(({id, title}:any)=><div>
                                            {id}{' '}{title} 
                                        </div>)}
                                    </ReactSortable>
                                </div>
                                
                                
                            </li>
                            <li>
                                <h2>4. 문서 수정하기</h2>
                                <GeneralContainer ref={iframe} selector={selector} path={path} displaynone={true}></GeneralContainer>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )

    }else{
        return <div></div>;
    }



}
export default DetailPageContainer;