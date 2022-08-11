import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Editor from "../../components/Editor";
import { ADD_CONTENTS } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import { writeSelector } from "../../recoils/pages";

const writeContainer = () =>{
    const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [path,setPath] = useState('');
    const [selector,setSelector] = useState('');
    const [page, setPage] = useRecoilState(writeSelector);

    const {mutate:addItem} = useMutation(()=>graphqlFetcher(ADD_CONTENTS,{title,path,selector,content}),{
        onSuccess:()=>{
            navigate("/");
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
    
    const onClick = ()=>{
        if(title.length > 10 && content.length > 10){
            setPage({title,content,path,selector});
            addItem();
        }else{
            alert("10자이상 입력해야함");
        }
    }


    const attr = {title,content,path,selector,onChange,onClick,mode:"gen"}
    return (
        <Editor {...attr}></Editor>
    )
}

export default writeContainer;