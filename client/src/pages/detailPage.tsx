import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Content } from "../typedef";
import { GET_CONTENTS,GET_CONTENT } from "./../graphql/contents";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import styled from "styled-components";
import { IdSelector } from "../recoils/pages";

const Detail = styled.div`
    border:1px solid #000;
    margin:30px;
    & h2 {padding:20px; border-bottom:1px solid #000}
    & h2 span { font-size:1.4em; }
    & p,div {padding:20px; font-size:1.4em;}
    & div {padding-top:0px;}
`

const DetailPage = ()=>{
    const param = useParams<string>();
    const {id}=param;
    const [idState, setIdState] = useRecoilState(IdSelector);
    useEffect(()=>{
        setIdState(id);
    },[id])
    const {data:contentDataArray,isFetched} = useQuery([QueryKeys.CONTENT,"view",id], ()=>graphqlFetcher(GET_CONTENT,{id}))

    if(isFetched){
        const {title,content} = contentDataArray.content[0]
        return (<Detail>
            <h2><span>제목 : </span><span>{title}</span></h2>
            <p><span>내용 : </span></p>
            <div>{content}</div>
        </Detail>)
    }else{
        return (<div>
            <h2>올바르지 않은 아이디 값 입니다.</h2>
        </div>)
    }
}
export default DetailPage;