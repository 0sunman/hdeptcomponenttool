import { SyntheticEvent } from "react";
import styled from "styled-components";
import {css} from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { List } from "../typedef";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { GET_CONTENTS } from "../graphql/contents";

const ListComponent = styled.ul`
    display:block;width:100%;list-style:none;margin:0px;padding:0px;
`
const ListItem = styled.li`
    display:block;width:100%;height:33px;
    text-align:center;
    font-size:15px;
    line-height:33px;
    border-bottom:1px solid #e8e8e8;
    overflow:hidden;
`


const MainPage = () => {
    const {data:list, isFetched} = useQuery([QueryKeys.CONTENT,"view","all"],()=>graphqlFetcher(GET_CONTENTS));
    if(isFetched){
        return ( 
            <div>   
                <ListComponent>
                {
                    list.contents.map((record:any) => <Link to={`/detail/${record.id}`}><ListItem>{record.title}</ListItem></Link>)
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
