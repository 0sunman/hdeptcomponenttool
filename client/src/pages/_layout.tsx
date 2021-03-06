import { Suspense, SyntheticEvent, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { REMOVE_CONTENT, ADD_CONTENTS } from "../graphql/contents";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { CurrentPageSelector, IdSelector, writeSelector } from "../recoils/pages";

const Main = styled.div`
    position:absolute; width:100%;
    height:calc(100% - 40px);
    display:block; overflow:scroll
`

const Header = styled.div`
    width:100%;
    display:div; 
    height:40px; 
    line-height:40px;
    border:0px solid #000; 
    border-bottom:1px solid #000;
    padding:0px;
    text-align:center;
`
const Menu = styled.div`
    display:flex; 
    height:40px; 
    & .back{margin-left:10px; border:0; background-color:#fff}
    & .sub{margin-left:auto}
    & .sub > button{margin-right:10px; border:0; background-color:#fff}
`

const onChange = (e:SyntheticEvent)=>{
    const inputData = (e.target) as HTMLInputElement;
}

const GlobalLayout = ()=>{
    const location = useLocation();
    const id = useRecoilValue(IdSelector);
    const [currentPage, setCurrentPage] = useRecoilState(CurrentPageSelector);
    const [page, setPage] =useRecoilState(writeSelector);
    const {title,content} = page;

    const navigate = useNavigate();
    const {mutate:removeItem} = useMutation((id:string)=>graphqlFetcher(REMOVE_CONTENT,{id}),{
        onSuccess:()=>{
            navigate("/")
        }
    });
    const {mutate:addItem} = useMutation(()=>graphqlFetcher(ADD_CONTENTS,{title,content}),{
        onSuccess:()=>{
            navigate("/");
        }
    });
    const onRemove = () =>{
        removeItem(id);
    }
    
    useEffect(()=>{
        setCurrentPage(location.pathname);
    },[location])
    
    useEffect(()=>{
        if(page.title !== "" && page.content !== ""){
            addItem();
        }
    },[page])
    return (
    <div>
        <Header>
            <Menu>
                {(currentPage !== "/") && <button onClick={() => navigate(-1)} className="back material-symbols-outlined">arrow_back_ios</button>}
                <div className="sub">
                    {(currentPage.indexOf("/write") === -1) && <button onClick={() => navigate("/write")}>?????????</button>}
                    {(currentPage.indexOf("/detail") > -1) && <button onClick={() => onRemove()}>??????</button>}
                </div>
            </Menu>
        </Header>
        <Main>
            <Suspense fallback={'loading'}>
                <Outlet/>
            </Suspense>
                <div>                
                </div>
        </Main>
    </div>
    
    )
}
export default GlobalLayout;