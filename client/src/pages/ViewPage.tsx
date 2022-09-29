import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_DOCUMENT } from "../graphql/documents";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { alertSelector, alertTextSelector, codeSelector, isPreviewDOMLoadedSelector, pathSelector, selectorSelector } from "../recoils/pages";
import axios from "axios";

const ViewPage = ()=>{
    const location = useLocation();
    const param = useParams<string>();
    const {id} = param;
    const iframeElement = useRef<HTMLIFrameElement>(null);
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const [componentsList, setComponentList] = useState<[]>([]);
    const [isPreviewDOMLoaded, setIsPreviewDOMLoaded] = useRecoilState<boolean>(isPreviewDOMLoadedSelector);
    const testo = useRef(null);

    const {isSuccess,data,refetch} = useQuery([QueryKeys.CONTENT,"view","document",id], ()=>graphqlFetcher(GET_DOCUMENT,{id:Number(id)}),{
        onSuccess:({document})=>{
            const [{content:code,selector,path,author,componentList}] = document;
                if(document.length > 0){
                    setCodeData(code);
                    setSelector(".content-section");
                    setPath(path);
                    axios({method:"GET",url:path}).then((response)=>{
                        const htmlCode = response.data.replace(`<!---22d764ca-0c55-4509-88de-51eabed3c7ec0spage877cea15-d229-4cd0-b217-b4cb313ba826-->`,code);
                        try{
                            const wrappingFirst = `<!--0script>`;
                            const wrappingLast = `</0script-->`;
                            const codeText = code.replace(/\n/gi,"").match(/\<!--0script>.*\<\/0script-->/gi);
                            testo.current!.innerHTML = htmlCode.replace(/contenteditable/gi,"data-contenteditable");

                            
                            axios({method:"GET",url:'https://image.thehyundai.com/cos_cdn/js/cos/dist/jquery-1.11.3.min.js'}).then((response)=>{
                                window.eval(response.data);
                                setTimeout(()=>{
                                    window.eval(codeText[0].replace(wrappingFirst,"").replace(wrappingLast,""));
                                },1000);    
                            })
                        }catch(e){
                            console.log("스크립트 에러 발생");
                            console.log(e);
                        }
                    })
                }else{
                }
    },onError:(e)=>{
    },retry:1})
    useEffect(()=>{

    },[codeData])

    return <div ref={testo}></div>
    
}
export default ViewPage;

