import React from "react";
import { Suspense, SyntheticEvent, useEffect } from "react";
import { useMutation } from "react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Alert from "../components/Popup/alert";
import { REMOVE_CONTENT, ADD_CONTENTS } from "../graphql/contents";
import { graphqlFetcher } from "../lib/queryClient";
import { CurrentPageSelector, IdSelector, writeSelector, alertSelector, alertTextSelector } from "../recoils/pages";

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
    border:0;
    padding:0px;
    text-align:center;
`
const Menu = styled.div`
    display:flex; 
    height:40px; 
    flex-direction:row;
    justify-content:center;
    color:white;
    background-color:#45675b;
    & .back{position:absolute; top: 7px; left: 5px;margin-left:10px; color:white; border:0; background-color:#45675b}
    & .sub{position:absolute; right:7px; color:white;}
    & .sub > button{margin-right:10px; border:0; background-color:#45675b; color:white;}
`
const Title = styled.span``

const onChange = (e:SyntheticEvent)=>{
    const inputData = (e.target) as HTMLInputElement;
}

const LoginWrapper = styled.div`z-index:101; `
const LoginForm = styled.form``;

const GlobalLayout = ()=>{
    const location = useLocation();
    const id = useRecoilValue(IdSelector);
    const [currentPage, setCurrentPage] = useRecoilState(CurrentPageSelector);
    const [page, setPage] =useRecoilState(writeSelector);
    const {title,content,path,selector} = page;

    const navigate = useNavigate();

    
    useEffect(()=>{
        setCurrentPage(location.pathname);
    },[location])
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
                            <Link to='/' style={{color:"white"}}>목록으로</Link>
                        </div>
                    )}
            </Menu>
        </Header>
        <Main>
            <Suspense fallback={<Alert/>}>
                <Outlet/>
                <Alert/>
            </Suspense>
        </Main>
        
        <LoginWrapper className="popup-bg">
            <div className="popup login">
                <div className="login">
                    <h2>
                        웹페이지 편집기 로그인
                    </h2>
                    <form>
                        <div>
                            <input type="text" placeholder="아이디"></input>
                            <input type="text" placeholder="비밀번호"></input>
                            <input type="text" placeholder="비밀번호 확인"></input>
                        </div>
                        <div>
                            <button>로그인</button>
                        </div>
                        <div>
                             <button>회원가입</button>
                             <button>아이디 찾기</button>
                        </div>
                    </form>
                </div>
            </div>
        </LoginWrapper>
    </div>
    
    )
}
export default React.memo(GlobalLayout);