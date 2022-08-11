import styled, { StyledComponent } from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { GET_CONTENTS } from "../graphql/contents";
import { useRecoilState } from "recoil";
import { codeSelector, IdSelector, pathSelector, selectorSelector } from "../recoils/pages";
import { useEffect } from "react";

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
    background-position: 50%;
    & a{
        display: block;
        position: absolute;
        width: 100%;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        color: white;
        font-size: 24px;
        padding: 15px;
    }
`


const MainPage = () => {
    const {data:list, isFetched} = useQuery([QueryKeys.CONTENT,"view","all"],()=>graphqlFetcher(GET_CONTENTS));
    const [idState,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [path,setPath] = useRecoilState<string>(pathSelector);

    if(isFetched){
        return ( 
            <div>   
                <ListComponent>
                {
                    list.contents.map((record:any) => <ListItem imgUrl={record.imgUrl}><Link to={`/detail/${record.id}`}>{record.title}</Link></ListItem>)
                }            
                </ListComponent>
            </div>
    )
    }else{
        return (
            <div>로딩중</div>
        )
    }

}
export default MainPage;
