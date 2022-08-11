import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GET_CONTENT } from "../../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { codeSelector, IdSelector, pathSelector, selectorSelector } from "../../recoils/pages";
import DetailPageComponent from "../../components/DetailPage";
import PreviewContainer from "../Preview";
import GeneralContainer from "./general";
import DevContainer from "./dev";

const DetailPageContainer = ({pageType}:{pageType:("general" | "dev")})=>{
    const param = useParams<string>();
    const iframe = useRef<HTMLIFrameElement>(null);
    const [idState,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const {id}=param;
    useEffect(()=>{
        console.log(id);
        setIdState(id as string);
    },[id]);
    const {data,isFetched} = useQuery([QueryKeys.CONTENT,"view",id], ()=>graphqlFetcher(GET_CONTENT,{id}),{onSuccess:({content})=>{
        setCodeData(content[0].content)
    }})

    

    if(isFetched){
        return (
        <DetailPageComponent>
            <PreviewContainer isFetched={isFetched} ref={iframe} selector={data.content[0].selector} path={data.content[0].path}/>
            {pageType=== "general" ? (
                <GeneralContainer ref={iframe}></GeneralContainer>
            ): pageType ==="dev" ? (
                <DevContainer ref={iframe} data={data}></DevContainer>
            ):(<div>Type ERROR</div>)}
        </DetailPageComponent>
        )
    }else{
        return (<div>
            <h2>올바르지 않은 아이디 값 입니다.</h2>
        </div>)
    }

}
export default DetailPageContainer;