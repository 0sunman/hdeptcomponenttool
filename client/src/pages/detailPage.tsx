import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT } from "./../graphql/contents";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import styled from "styled-components";
import { IdSelector, popupImageUploadSelector, codeSelector } from "../recoils/pages";
import ControlPaneContainer from "../container/ControlPane";
import copyClipboard from "../util/copyClipboard";
import ImageUploaderPopup from "../container/Popup/ImageUploader";
import PreviewContainer from "../container/Preview";



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
    const iframe = useRef<HTMLIFrameElement>(null);
    const param = useParams<string>();
    const [idState, setIdState] = useRecoilState<string>(IdSelector);
    const {id}=param;
    useEffect(()=>{
        setIdState(id);
    },[id]);

    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const {isFetched} = useQuery([QueryKeys.CONTENT,"view",id], ()=>graphqlFetcher(GET_CONTENT,{id}),{onSuccess:({content})=>{
        setCodeData(content[0].content)
    }})

    const doCopyClipboard = () => {
        copyClipboard(iframe.current!.contentDocument!.querySelector(".content-section")!.innerHTML)
    }
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);

    const openImageUploaderPopup = () =>{
        setVisibleImageUploaderPopup({main:"flex"});
    }
    if(isFetched){
        return (<Detail>
            <PreviewContainer isFetched={isFetched} ref={iframe}/>
            <ImageUploaderPopup/>
            
            <ControlPaneContainer copyCode={doCopyClipboard} ImageUploader={openImageUploaderPopup}>
                <div className="general">
                </div>

            </ControlPaneContainer>
            
           
        </Detail>)
    }else{
        return (<div>
            <h2>올바르지 않은 아이디 값 입니다.</h2>
        </div>)
    }
}
export default DetailPage;


/*

                <div className="code" style={{display:"none"}}>
                    <textarea id="content_code" onChange={onCodeChange}>{codeData}</textarea>
                </div>

*/