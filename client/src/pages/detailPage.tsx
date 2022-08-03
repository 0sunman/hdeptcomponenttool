import { RefObject, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT } from "./../graphql/contents";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import styled from "styled-components";
import { IdSelector } from "../recoils/pages";

const Detail = styled.div`
    border:1px solid #000;
    margin:30px;
    margin-bottom:300px;
    & h2 {padding:20px; border-bottom:1px solid #000}
    & h2 span { font-size:1.4em; }
    & p,div {padding:20px; font-size:1.4em;}
    & div {padding-top:0px;}
    textarea{width:100%;height:500px;}
`

const DetailPage = ()=>{
    let content = "";
    const param = useParams<string>();
    const {id}=param;
    const [iframe, controller,general,code] = [useRef<HTMLIFrameElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
    const [idState, setIdState] = useRecoilState(IdSelector);
    const {data:contentDataArray,isFetched} = useQuery([QueryKeys.CONTENT,"view",id], ()=>graphqlFetcher(GET_CONTENT,{id}))
    let isManual = true;
    const runDOMController = (vdom:DocumentFragment,iframe:RefObject<HTMLIFrameElement>)=>{
        
        const targetIframe = iframe.current!.contentDocument!;
        targetIframe.querySelector(".content-section")!.innerHTML = content;    
        Array.prototype.slice.call(targetIframe.querySelectorAll(".content-section *[data-target-control]")).every(element=>{

            const targetControl = element.dataset.targetControl;
            const [name,target] = targetControl.split("_");
            const targets = target.split("-");
            targets.every((target:string)=>{
                const [div, titleElement, inputElement] = [document.createElement("div"), document.createElement("span"), document.createElement("input")]
                div.appendChild(titleElement);
                div.appendChild(inputElement);

                titleElement.className = "control-title"
                inputElement.className = "control-input"
                inputElement.type = "text";

                switch(target){
                    case "href":
                        titleElement.innerText = name +" 링크"    
                        inputElement.value = element.href;
                        inputElement.addEventListener("keyup",()=>{   
                            element.href = element.value; 
                        })                   
                        break;
                    case "text":
                        titleElement.innerText = name +" 일반 텍스트"          
                        inputElement.value = element.innerText;    
                        inputElement.addEventListener("keyup",()=>{       
                            element.innerText = inputElement.value;    
                        })                   
                    break;
                    case "src":
                        titleElement.innerText = name +" 이미지"         
                        inputElement.value = element.href;             
                        inputElement.addEventListener("keyup",()=>{       
                            element.href = inputElement.value;    
                        })                                        
                    break;
                    case "style":
                        titleElement.innerText = name +" 스타일"         
                        inputElement.value = element.getAttribute("style");      
                        inputElement.addEventListener("keyup",()=>{       
                            element.style.border = "5px solid yellow"
                            element.setAttribute("style",inputElement.value);    
                        })                   
                    break;
                    default:
                        debugger;
                    break;
                } 

                vdom.appendChild(div);
                return true;
            })
            return true;
        })

        document.querySelector("#html_controller > .general")?.appendChild(vdom);
        (document.querySelector("#content_code") as HTMLInputElement).value = targetIframe.querySelector(".content-section")!.innerHTML;  
        (document.querySelector("#content_code") as HTMLInputElement).addEventListener("keyup",()=>{
            if(isManual){
                alert("[ 수동 모드로 전환 ]");
                isManual = false;
            }
            targetIframe.querySelector(".content-section")!.innerHTML = (document.querySelector("#content_code") as HTMLInputElement).value;  
            (document.querySelector("#html_controller") as HTMLElement).style.display = "none";
        })
    }
    useEffect(()=>{
        setIdState(id);
    },[id])
    useEffect(()=>{
        if(isFetched){
            const elementIframe = iframe;
            const vitualDocument = document.createDocumentFragment();
            elementIframe.current!.addEventListener("load",()=>{
                runDOMController(vitualDocument, elementIframe);
            })
        }
    },[isFetched])
    const switchVisible = (mode:string)=>{
        switch(mode){
            case "mobile":
            break;
            case "pc":
            break;
        }        
    }
    const copy = () =>{

    }
    const switchTab = (tab:string) => {
        switch(tab){
            case "general":
            break;
            case "code":
            break;
        }
    }
    const controlHeight = (showRatio:number)=>{
        const PTRController = controller.current as HTMLElement;
        const setControllerHeight = (attribute:string) => {

            PTRController!.style.height = attribute;
        }
        switch(showRatio){
            case 0:
                setControllerHeight("50px")
            break;
            case 20:
                setControllerHeight("20%")
            break;
            case 30:
                setControllerHeight("30%")
            break;
            case 40:
                setControllerHeight("40%")
            break;
            case 80:
                setControllerHeight("80%")
            break;
        }        
    }

    if(isFetched){
        const {title} = contentDataArray.content[0]
        content = contentDataArray.content[0].content
        return (<Detail>
            <p><span>미리보기 : </span></p>
            <div className='preview'><iframe style={{width:"100%",height:"1000px"}} src="/public/cos.html" ref={iframe}></iframe></div>
            <div ref={controller} id="html_controller">
                <div style={{width:"100%",height:"30px",textAlign:"center"}}>
                    <button onClick={copy}>코드 복사</button>
                    <button onClick={()=>switchTab("general")}>이미지 업로드</button>
                    <button onClick={()=>switchTab("general")}>일반 모드</button>
                    <button onClick={()=>switchTab("code")}>코드 모드</button>
                    <button onClick={()=>controlHeight(0)}>숨기기</button>
                    <button onClick={()=>controlHeight(20)}>20%</button>
                    <button onClick={()=>controlHeight(30)}>30%</button>
                    <button onClick={()=>controlHeight(40)}>40%</button>
                    <button onClick={()=>controlHeight(80)}>80%</button>
                </div>
                <div className="general" ref={general}>

                </div>
                <div className="code" ref={code}>
                    <textarea id="content_code">{content}</textarea>
                </div>

            </div>
           
            <div className='imageUploader'>
                <div>이미지 업로더 :  <input type="file"/><input type="text" id='imgUrl'/></div>
            </div>
        </Detail>)
    }else{
        return (<div>
            <h2>올바르지 않은 아이디 값 입니다.</h2>
        </div>)
    }
}
export default DetailPage;