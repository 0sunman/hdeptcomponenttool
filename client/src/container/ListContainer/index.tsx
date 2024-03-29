import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { RecoilBridge, useRecoilState } from "recoil";
import styled from "styled-components";
import { GET_CONTENTS } from "../../graphql/contents";
import { GET_DOCUMENTS, GET_DOCUMENTS_AUTHOR } from "../../graphql/documents";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, QRPopupSelector } from "../../recoils/pages";
import QRCode from 'qrcode';

const ListComponent = styled.ul`
    display:block;width:100%;list-style:none;margin:0px;padding:0px;text-align:center;
` 

const ListItem = styled.li`
    display:inline-block;width:30%;height:250px;
    margin:5px;
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
        padding: 15px 0px;
    }
`

const SearchItem = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 99;
`
const SearchInput = styled.div`
    display:flex;
    width: 100%;
    height: 40px;
    padding: 0 !important;
    margin: 0;
    border: 0;
    background-color: #45675b;
    align-items:center;
    justify-content:center;
    text-align: center;
    > input{ border:0; border-radius:5px; width:50%; height: 30px; text-align:center; }
`

const SearchKeyword = styled.div`
    display: flex; height: 40px; justify-content: center; align-items: center; background-color: #45675b;
    > span{ margin:5px; padding:5px; background-color:#fff; border-radius:5px; color:#000}
`

const ListContainer = ()=>{
    const [isQRPopup, setIsQRPopup] = useRecoilState(QRPopupSelector)
    const [cdTab, setCdTab] = useState("component");
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const {data:list, isSuccess} = useQuery([QueryKeys.CONTENT,"view","all"],()=>graphqlFetcher(GET_CONTENTS),{
        onSuccess:({data})=>{    
            setAlertText("환영합니다!<br><br>모바일 페이지로는 현재 개발이 안돼있어서... 깨져나올거에요!<br>추후에 개발 예정이며<br>태블릿이나 PC로 오세요!");
        }, 
        onError:(e)=>{
            setAlertFlag(true)
            setAlertText("데이터를 읽어오다가 사고가 났네요... 다시 시도해보시겠어요?");
            console.error(e);
            throw Error("에러발생!!!")
        }});

    const {data:list_doc, isSuccess:isDocSuccess} = useQuery(["document","all"],()=>graphqlFetcher(GET_DOCUMENTS_AUTHOR,{author:window.localStorage.getItem("userid") !== null ? window.localStorage.getItem("userid") : ""}),{
        onSuccess:({data})=>{    
            setAlertText("환영합니다!<br><br>모바일 페이지로는 현재 개발이 안돼있어서... 깨져나올거에요!<br>추후에 개발 예정이며<br>태블릿이나 PC로 오세요!");
        }, 
        onError:(e)=>{
            setAlertFlag(true)
            setAlertText("데이터를 읽어오다가 사고가 났네요... 다시 시도해보시겠어요?");
            console.error(e);
            throw Error("에러발생!!!")
        }});
    useEffect(()=>{
        setAlertText("컴포넌트들을 읽어오고 있습니다.");
    },[])
    if(isSuccess && isDocSuccess){
        const result = [...list.contents];
        return (<div>   

    <SearchItem className="SearchComponent">
        <SearchInput>
            <input type='text' placeholder="원하는 컴포넌트를 검색해주세요."></input>
            <span className="search material-symbols-outlined icon">search</span>
        </SearchInput>
    <SearchKeyword>
        <span>#COS</span>
        <span>#AOS</span>
        <span>#ARKET</span>
        <span>#TOTEME</span>
    </SearchKeyword>
    </SearchItem>
    <div className="CDTab">
        <div className={cdTab==="component" ? "active" : ""} onClick={()=>{
            setCdTab("component")
        }}>컴포넌트</div>
        <div className={cdTab==="document" ? "active" : ""} onClick={()=>{
            setCdTab("document")
        }}>문서</div>
    </div>
        <div>
            {cdTab==="component" && <div className="ListComponent">
            
                { 
                    list.contents.map((record:any,idx:any)=>{ 
                    //record
                    return (
                        <ListItem imgUrl={record.imgUrl} key={idx}>
                            <Link to={`/detail/${record.id}`} >{record.title}</Link>
                        </ListItem>
                        )
                    })
                }
                </div>}
            
            {cdTab==="document" && (<div className="ListComponent">
            
                { 
                    list_doc.documentsauthor.map((record:any,idx:any) =>{ 
                    //record
                    return (
                        <div className="DocumentElement" key={idx}>
                            <div>
                                {record.title}
                                <div className="ButtonList">
                                    <Link to={`/document/${record.id}`} >수정</Link>
                                    <a href={`/page/${record.id}`} target="_blank">보기</a>
                                    <a onClick={()=>{ alert('개발중 ㅠ');}} >삭제</a>
                                    <a onClick={()=>{
                                        setIsQRPopup(true);
                                        setTimeout(()=>{
                                                                                
                                            QRCode.toCanvas(document.querySelector("#qrcodeCanvas"),
                                            `https://ts.thehyundai.works/page/${record.id}`, { toSJISFunc: QRCode.toSJIS }, function (error) {
                                            if (error) console.error(error)
                                            console.log('success!')
                                            })
                                        },100)
                                    }}>QR코드</a>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>)}
    </div>

            </div>)
    }else{
        return (<div></div>)
    }
}

export default React.memo(ListContainer)

