import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT } from "../../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, codeSelector, IdSelector, pathSelector, selectorSelector } from "../../recoils/pages";
import DetailPageComponent from "../../components/DetailPage";
import PreviewContainer from "../Preview";
import GeneralContainer from "./general";
import DevContainer from "./dev";
import Popup from "../../components/Popup";
import Alert from "../../components/Popup/alert";
import React from "react";

const DetailPageContainer = ({pageType}:{pageType:("general" | "dev")})=>{
    const param = useParams<string>();
    const iframe = useRef<HTMLIFrameElement>(null);
    const [idState,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const [alertFlag, setAlertFlag] =useRecoilState<boolean>(alertSelector);
    const [alertText, setAlertText] =useRecoilState(alertTextSelector);

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

    if(isSuccess){
            setAlertFlag(false);
            const {content:[{selector,path}]}= data;
            return (
            <DetailPageComponent>
                <PreviewContainer isSuccess={isSuccess} ref={iframe} selector={selector} path={path}/>
                {pageType=== "general" ? (
                    <GeneralContainer ref={iframe}></GeneralContainer>
                ): pageType ==="dev" ? (
                    <DevContainer ref={iframe} data={data}></DevContainer>
                ):(<div>Type ERROR</div>)}
            </DetailPageComponent>
            )

    }else{
        return <div></div>;
    }

}
export default DetailPageContainer;