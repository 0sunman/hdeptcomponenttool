import { RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
    const [codeData,setCodeData] = useState("");
    const [isIframeLoaded,setIframeLoaded] = useState(false);
    let isManual = true;
    const [idState, setIdState] = useRecoilState(IdSelector);
    const param = useParams<string>();
    const {id}=param;
    const [iframe, controller,general,code] = [useRef<HTMLIFrameElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

    const {data:contentDataArray,isFetched} = useQuery([QueryKeys.CONTENT,"view",id], ()=>graphqlFetcher(GET_CONTENT,{id}),{onSuccess:({content})=>{
        setCodeData(content[0].content)
    }})
    const runDOMController = (vdom:DocumentFragment,iframe:RefObject<HTMLIFrameElement>)=>{
        
        const targetIframe = iframe.current!.contentDocument!;
        targetIframe.querySelector(".content-section")!.innerHTML = codeData;    
        document.querySelectorAll("#html_controller > .general > div").forEach(element=>element.remove())
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
                            element.href = inputElement.value; 
                            
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
        
        setCodeData(targetIframe.querySelector(".content-section")!.innerHTML);  
//        targetIframe.querySelector(".content-section")!.innerHTML = codeData;  
        
    }

    const eventLoadListener = (elementIframe : RefObject<HTMLIFrameElement>)=>{
        const vitualDocument = document.createDocumentFragment();
        runDOMController(vitualDocument, elementIframe);
        
    }

    const switchVisible = (mode:string)=>{
        switch(mode){
            case "mobile":
            break;
            case "pc":
            break;
        }        
    }
    const copy = (e:SyntheticEvent) =>{
        const temp:HTMLTextAreaElement = document.createElement("textarea");
        temp.value = codeData;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
    }
    const switchTab = (tab:string) => {
        switch(tab){
            case "inHyundaiMessage":
                (document.querySelector(".selection") as HTMLDivElement).style.display = "none";
                realImageUploader.current!.style.display = "none";
                inHyundaiMessage.current!.style.display = "block";
            break;
            case "realImageUploader":
                (document.querySelector(".selection") as HTMLDivElement).style.display = "none";
                realImageUploader.current!.style.display = "block";                
                inHyundaiMessage.current!.style.display = "none";
            break;
            case "general":
                iframe.current!.contentDocument!.location.reload()
                general.current!.style.display = "block"
                code.current!.style.display = "none"
            break;
            case "code":
                iframe.current!.contentDocument!.location.reload()
                general.current!.style.display = "none"
                code.current!.style.display = "block"
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
            case 50:
                setControllerHeight("50%")
            break;
            case 80:
                setControllerHeight("80%")
            break;
        }        
    }

    useEffect(()=>{
        setIdState(id);
    },[id]);
    const onCodeChange = (e:SyntheticEvent)=>{
//        const targetIframe = iframe.current!.contentDocument!;
        setCodeData((e.target as HTMLTextAreaElement).value);
    }
    const onGeneralChange = (element:any,attribute:string,value:string)=>{
        const targetIframe = iframe.current!.contentDocument!;
        element[attribute] = value;
        setCodeData(targetIframe.querySelector(".content-section")!.innerHTML);
    }
    useEffect(()=>{
            if(isIframeLoaded){
                const targetIframe = iframe.current!.contentDocument!;
                targetIframe.querySelector(".content-section")!.innerHTML = codeData;          
            }
    },[codeData])
    useEffect(()=>{
        if(isFetched){
            setIframeLoaded(true);
            const elementIframe = iframe;
            elementIframe.current!.addEventListener("load",eventLoadListener.bind(this,elementIframe))
            return ()=>{
                try{
                    (elementIframe.current as HTMLIFrameElement).removeEventListener("load",eventLoadListener.bind(this,elementIframe));
                }catch(e){

                }
            }
        }
    },[isFetched]);
    const [inHyundaiMessage, realImageUploader] = [useRef<HTMLDivElement>(null),useRef<HTMLDivElement>(null)]
    const popupRef = useRef<HTMLDivElement>(null);
    const openPopup = () =>{
        (popupRef.current as HTMLDivElement).style.display = "flex"
    }
    const closePopup = () => {
        (popupRef.current as HTMLDivElement).style.display = "none"
    }
    const switchStyle = (site:string)=>{
        switch(site){
            case "cos":
            break;
            case "aos":
            break;
            default:
            break;
        }
    }
    if(isFetched){
        const {content, title} = contentDataArray.content[0]
        return (<Detail>
            <div className="popup-bg" ref={popupRef} style={{display:"none"}}>
                <div className="popup imageUploader">
                <span className="material-symbols-outlined close" onClick={closePopup}>close</span>
                    <h2>이미지 업로더</h2>
                    <div className="selection">
                        <button onClick={() => switchTab("inHyundaiMessage")}>현대백화점 내부망 전용</button>
                        <button onClick={() => switchTab("realImageUploader")}>외부 직원 전용</button>
                    </div>
                    <div ref={inHyundaiMessage} style={{display:"none"}}>
                        <a href="http://tis.thehyundai.com/front/daumeditor/editor6.jsp#" target="_blank">[ 클릭 ]</a>
                        <span>다음에디터에서 이미지 업로드 이후, html로 변환해서 URL을 가지고 오세요!</span>
                    </div>                        
                    <div  ref={realImageUploader} style={{display:"none"}}>
                        <span>파일 업로드 :</span><input type="file"/><input type="text" id='imgUrl'/>
                    </div>
                </div>
            </div>
            <p><span>미리보기 : </span></p>
            <div className='preview'><iframe src="/public/cos.html" ref={iframe}></iframe></div>
            <div ref={controller} id="html_controller">
                <div style={{width:"100%",height:"30px",textAlign:"center"}}>
                    <button onClick={copy}>코드 복사</button>
                    <button onClick={()=>openPopup()}>이미지 업로드</button>
                    <button onClick={()=>switchTab("general")}>일반 모드</button>
                    <button onClick={()=>switchTab("code")}>코드 모드</button>
                    <button onClick={()=>controlHeight(0)}>숨기기</button>
                    <button onClick={()=>controlHeight(20)}>20%</button>
                    <button onClick={()=>controlHeight(30)}>30%</button>
                    <button onClick={()=>controlHeight(40)}>40%</button>
                    <button onClick={()=>controlHeight(50)}>50%</button>
                    <button onClick={()=>controlHeight(80)}>80%</button>
                </div>
                <div className="general" ref={general} style={{display:"block"}}>

                </div>
                <div className="code" ref={code} style={{display:"none"}}>
                    <textarea id="content_code" onChange={onCodeChange}>{content}</textarea>
                </div>

            </div>
           
        </Detail>)
    }else{
        return (<div>
            <h2>올바르지 않은 아이디 값 입니다.</h2>
        </div>)
    }
}
export default DetailPage;