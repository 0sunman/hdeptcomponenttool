import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { GET_CONTENTS } from "../../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { alertSelector, alertTextSelector } from "../../recoils/pages";

const ListComponent = styled.ul`
    display:block;width:100%;list-style:none;margin:0px;padding:0px;
`

const ListItem = styled.li`
    display:block;width:100%;height:300px;
    position: relative;
    text-align:center;
    font-size:15px;
    line-height:33px;
    border-bottom:1px solid #e8e8e8;
    overflow:hidden;
    background: url(${(props:{imgUrl:string}) => props.imgUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    & a{
        display: block;
        position: absolute;
        width: 100%;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        color: white;
        font-size: 15px;
        padding: 15px;
    }
`
const ListContainer = ()=>{

    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const {data:list, isSuccess} = useQuery([QueryKeys.CONTENT,"view","all"],()=>graphqlFetcher(GET_CONTENTS),{
    onSuccess:({data})=>{    
        setAlertText("환영합니다!<br><br>모바일 페이지로는 현재 개발이 안돼있어서... 깨져나올거에요!<br>추후에 개발 예정이며<br>태블릿이나 PC로 오세요!");
    }, 
    onError:(e)=>{
        setAlertFlag(true)
        setAlertText("데이터를 읽어오다가 사고가 났네요... 다시 시도해보시겠어요?");
        console.log(e);
        throw Error("에러발생!!!")
    }});
    useEffect(()=>{
        setAlertText("컴포넌트들을 읽어오고 있습니다.");
    },[])
    if(isSuccess){
        
        return (<div>   
            <ListComponent>
            {
                list.contents.map((record:any) => <ListItem imgUrl={record.imgUrl}><Link to={`/detail/${record.id}`}>{record.title}</Link></ListItem>)
            }            
            </ListComponent>
        </div>)
    }else{
        return (<div></div>)
    }
}

export default React.memo(ListContainer)

