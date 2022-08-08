import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Editor from "../../components/Editor";
import { MODIFY_CONTENT } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import { codeSelector, controlPaneSizeSelector, IdSelector, writeSelector } from "../../recoils/pages";

const ModifyContainer = ({title,content,path,selector}:{title:string,content:string,path:string,selector:string}) =>{
    
    const [ptitle,setTitle] = useState(title);
    const [pcontent,setContent] = useState(content);
    const [ppath,setPath] = useState(path);
    const [pselector,setSelector] = useState(selector);
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const setPage = useSetRecoilState(writeSelector);
    const id:string = useRecoilValue(IdSelector);
    const {mutate:modifyItem} = useMutation(()=>graphqlFetcher(MODIFY_CONTENT,{id, title:ptitle,path:ppath,selector:pselector,content:pcontent}),{
        onMutate:(data)=>{
            console.log(data);
        },
        onSuccess:(data)=>{
            alert("수정 완료!");
//            console.log(data);
        }
    });
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
        console.log([ptitle]);
        modifyItem();
    }

    const attr = {title:ptitle,content:pcontent,path:ppath,selector:pselector,onChange,onClick,mode:"dev"}
    return (
        <Editor {...attr}></Editor>
    )
}

export default ModifyContainer;

function MODIFY_CONTENTS(MODIFY_CONTENTS: any, arg1: { title: string; path: string; selector: string; content: string; }): Promise<any> {
    throw new Error("Function not implemented.");
}
