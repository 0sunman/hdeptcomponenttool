import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Editor from "../../components/Editor";
import { MODIFY_CONTENT, REMOVE_CONTENT } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import { codeSelector, IdSelector, writeSelector } from "../../recoils/pages";

const ModifyContainer = ({title,content,path,selector,imgUrl}:{title:string,content:string,path:string,selector:string,imgUrl:string}) =>{
    const navigate = useNavigate();
    const [ptitle,setTitle] = useState(title);
    const [pcontent,setContent] = useState(content);
    const [ppath,setPath] = useState(path);
    const [pselector,setSelector] = useState(selector);
    const [pimgUrl,setImgUrl] = useState(imgUrl);
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const setPage = useSetRecoilState(writeSelector);
    const id:string = useRecoilValue(IdSelector);
    const {mutate:modifyItem} = useMutation(()=>graphqlFetcher(MODIFY_CONTENT,{id, title:ptitle,path:ppath,selector:pselector,imgUrl:pimgUrl,content:pcontent}),{
        onMutate:(data)=>{
            console.log(data);
        },
        onSuccess:(data)=>{
            alert("수정 완료!");
        }
    });
    const {mutate:removeItem} = useMutation((id:string)=>graphqlFetcher(REMOVE_CONTENT,{id}),{
        onSuccess:()=>{
            navigate("/")
        }
    });
    const onRemove = () =>{
        if(confirm("삭제하실건가요?") == true){
            removeItem(id);
        }
    }
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
        }else if(name == "imgUrl"){
            setImgUrl(value);
        }
    }
    useEffect(()=>{
        setCodeData(pcontent)
    },[pcontent])
    
    const onClick = ()=>{
        console.log([ptitle]);
        modifyItem();
    }
    
    const onImageChange = ({imageUrl}:{imageUrl:string})=>{
        console.log(imageUrl);
        setImgUrl(imageUrl);
        alert("이미지가 업데이트 되었습니다.");
    }

    const attr = {title:ptitle,content:pcontent,path:ppath,imgUrl:pimgUrl,selector:pselector,onChange,onClick,onImageChange,mode:"dev",onRemove}
    return (
        <Editor {...attr}></Editor>
    )
}

export default ModifyContainer;