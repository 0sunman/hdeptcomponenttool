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
    flex-direction:row;
    justify-content:center;
    & .back{position:absolute; top: 7px; left: 5px;margin-left:10px; border:0; background-color:#fff}
    & .sub{position:absolute; right:12px;}
    & .sub > button{margin-right:10px; border:0; background-color:#fff}
`
const Title = styled.span``

const onChange = (e:SyntheticEvent)=>{
    const inputData = (e.target) as HTMLInputElement;
}

const GlobalLayout = ()=>{
    const location = useLocation();
    const id = useRecoilValue(IdSelector);
    const [currentPage, setCurrentPage] = useRecoilState(CurrentPageSelector);
    const [page, setPage] =useRecoilState(writeSelector);
    const {title,content,path,selector} = page;

    const navigate = useNavigate();
    const {mutate:removeItem} = useMutation((id:string)=>graphqlFetcher(REMOVE_CONTENT,{id}),{
        onSuccess:()=>{
            navigate("/")
        }
    });
    const {mutate:addItem} = useMutation(()=>graphqlFetcher(ADD_CONTENTS,{title,path,selector,content}),{
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
                <Title>THE HYUNDAI - 해외브랜드 컴포넌트 편집기 
                    {(currentPage.indexOf("/write") > -1) && " - 글쓰기 모드"}
                    {(currentPage.indexOf("/detail") > -1) && " - 편집 모드"}
                
                </Title>
                {(currentPage !== "/") && <button onClick={() => navigate(-1)} className="back material-symbols-outlined">arrow_back_ios</button>}
                    {(currentPage.indexOf("/write") === -1 && currentPage.indexOf("/detail") === -1) && <div className="sub"><button onClick={() => {navigate("/write")}}>글쓰기</button></div>}
                    {(currentPage.indexOf("/detail") > -1) && (
                        <div className="sub">
                            <Link to='/'>목록으로</Link>
                        </div>
                    )}
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