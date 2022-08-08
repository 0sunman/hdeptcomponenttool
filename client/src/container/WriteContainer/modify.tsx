import { SyntheticEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Editor from "../../components/Editor";
import { codeSelector, writeSelector } from "../../recoils/pages";

const ModifyContainer = ({title,content,path,selector}:{title:string,content:string,path:string,selector:string}) =>{
    
    const [ptitle,setTitle] = useState(title);
    const [pcontent,setContent] = useState(content);
    const [ppath,setPath] = useState(path);
    const [pselector,setSelector] = useState(selector);
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const setPage = useSetRecoilState(writeSelector);
    const onChange = (e:SyntheticEvent) =>{
        const {name,value} = (e.target as HTMLInputElement);
        if(name == "title"){
            setTitle(value);
        }else if(name == "content"){
            setContent(value);
        }else if(name == "path"){
            setPath(value);
        }else if(name == "selector"){
            setSelector(value);
        }
    }
    useEffect(()=>{
        setCodeData(pcontent)
    },[pcontent])
    
    const onClick = ()=>{
        if(ptitle.length > 10 && pcontent.length > 10){
            setPage({ title:ptitle,content:pcontent,path:ppath,selector:pselector});
        }else{
            alert("10자이상 입력해야함");
        }
    }
    const attr = {title:ptitle,content:pcontent,path:ppath,selector:pselector,onChange,onClick}
    return (
        <Editor {...attr}></Editor>
    )
}

export default ModifyContainer;