import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT, GET_CONTENT_PATH } from "../../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, codeSelector, currentTargetState, IdSelector, pathSelector, selectorSelector,isPreviewDOMLoadedSelector } from "../../recoils/pages";
import PreviewContainer from "../Preview";
import GeneralContainer from "./general";
import DevContainer from "./devDocument";
import styled from "styled-components";
import { ADD_DOCUMENT, GET_DOCUMENT, MODIFY_DOCUMENT } from "../../graphql/documents";
import useResizeHooks from "../../lib/useResize";
import { ReactSortable } from "react-sortablejs";
import {v4} from 'uuid';
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
    const location = useLocation();
    const param = useParams<string>();
    const iframe = useRef<HTMLIFrameElement>(null);
    const navigate = useNavigate();
    const [idState,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const [currentTarget, setDataTarget] = useRecoilState(currentTargetState)
    const [handle,positionX,setPositionX,flag,setFlag,show,setShow,MouseMoveEvent,TouchMoveEvent,MouseDownEvent,TouchStartEvent,MouseUpEvent] = useResizeHooks();
    const [isPreviewDOMLoaded, setIsPreviewDOMLoaded] = useRecoilState<boolean>(isPreviewDOMLoadedSelector);
    const [step, setStep] = useState<Number>(0);
    const {id}=param;
    const [loadedComponentList, setLoadedComponentList] = useState([]);
    const [componentsList, setComponentList] = useState<[]>([]);
    const [newArray, setNewArray] = useState([]);
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
            const [{content:code,selector,path,author,componentList}] = document;
                if(document.length > 0){
                    setAlertText("데이터를 세팅 성공!");
                    setCodeData(code);
                    setSelector(".content-section");
                    setPath(path);
                    setComponentList(JSON.parse(componentList) ? JSON.parse(componentList) : []);
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


    const {mutate:modifyDocument} = useMutation(({id,content,path,author,imgUrl,componentList}:any)=>graphqlFetcher(MODIFY_DOCUMENT,{id:Number(id),content,path,author,imgUrl,componentList:String(componentList)}),{
        onSuccess:({modifyDocument:docs})=>{
            // setAlertText("작성 완료! 홈으로 돌아가겠습니다.");
            
            navigate(`/`)
        },
        onError:(e)=>{
            console.error(e);
            setAlertFlag(true);
            setAlertText("에러가 발생했습니다! ㅠㅠ")
        }
    });
    

    useEffect(()=>{
        setLoadedComponentList(loadedComponentlist);
    },[loadedComponentlist])

    useEffect(()=>{
        console.log(componentsList)
        if(componentsList && componentsList.length > 0){
            setCodeData(componentsList.reduce((init,value)=>{
                init += value.content;
                return init;
            },""))
            setIsPreviewDOMLoaded(true)
    
        }
    },[componentsList])
    const [step1,step2,step3,step4] = [useRef(null),useRef(null),useRef(null),useRef(null)]
    useEffect(()=>{
        if(step1.current !== null|| step2.current !== null|| 
            step3.current !== null|| step4.current !== null){
            step1.current.style.display = "none"
            step2.current.style.display = "none"
            step3.current.style.display = "none"
            step4.current.style.display = "none"


            if(step === 1){
                step1.current.style.display = "block"
            }else if(step ===2 || step ===3){
                step2.current.style.display = "block"
                step3.current.style.display = "block"
            }else if(step === 4){
                step4.current.style.display = "block"

            }else{
                step1.current.style.display = "block"

            }
                        
        }

    })

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
                                <h2 onClick={()=>setStep(1)}>1. 사용할 기본 템플릿을 선택해주세요.</h2>
                                <div ref={step1} className="content" style={{"display":"block"}}>
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
                                    setStep(2)
                                }}>
                                    <option value="">없음</option>
                                    <option value="cos">COS</option>
                                    <option value="aos">AOS</option>
                                    <option value="thehyundai">THEHYUNDAI</option>
                                    <option value="nanushka">Nanushka</option>
                                </select>
                                </div>
                            </li>
                            <li className="accodian">
                                <h2 onClick={()=>{ setStep(2)}}>2. 사용할 컴포넌트를 추가해주세요</h2>
                                <div ref={step2} className="content">
                                    
                                    <ul className="add-list">
                                        {isSuccessComponent && loadedComponentList && loadedComponentlist.contentspath.map(({id:componentId,title,content})=>(
                                            <li>{title} <button onClick={e=>{
                                                const uniqueid = v4();
                                                setComponentList([...componentsList, {
                                                    id:componentsList.length,
                                                    componentId,
                                                    uniqueid,
                                                    title: title+ (componentsList.length),
                                                    content:`<div data-0sid='${uniqueid}' data-0stitle='${title+ (componentsList.length)}'>${content}</div>`}])
                                            }}>추가</button></li>
                                            ))}
                                    </ul>
                                </div>
                            </li>
                            <li className="accodian">
                                <h2 onClick={()=>setStep(3)}>3. 컴포넌트의 순서를 결정해주세요.</h2>
                                <div ref={step3} className="content">
                                    <ReactSortable animation={200} className="order-list" list={componentsList} setList={(...arg) =>{
                                        if(arg[0].length > 0){

                                            setComponentList(arg[0]);
                                        }
                                        
                                        }}>
                                        {componentsList?.map(({id, title}:any)=><div>
                                            {id}{' '}{title} 
                                        </div>)}
                                    </ReactSortable>
                                </div>
                                
                                
                            </li>
                            <li>
                                <h2 onClick={()=>setStep(4)}>4. 문서 수정하기</h2>
                                <div ref={step4} className="content">
                                    <GeneralContainer ref={iframe} selector={selector} path={path} displaynone={true}></GeneralContainer>
                                </div>
                            </li>
                            <li>
                                <button className="saveButton" onClick={(e)=>{
                                    const id = location.pathname.split("/").reverse()[0];
                                    const content = document.querySelector("iframe")?.contentWindow?.document.querySelector(".content-section")?.innerHTML;
                                    const author = window.localStorage.getItem("userid");
                                    const imgUrl = "";
                                    
                                    const componentlist = JSON.stringify(componentsList.map((component:any) => {
                                        component.content = document.querySelector("iframe")?.contentWindow?.document.querySelector(`div[data-0sid*='${component.uniqueid}']`)?.outerHTML;
                                        return component;
                                    }));
                                    modifyDocument({id,content,path,author,imgUrl,componentList:componentlist})
                                }}>문서 저장하기</button>
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