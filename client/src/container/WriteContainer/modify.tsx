import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Editor from "../../components/Editor";
import { MODIFY_CONTENT, REMOVE_CONTENT } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import useModify from "../../lib/useModify";
import { alertSelector, alertTextSelector, codeSelector, IdSelector, writeSelector } from "../../recoils/pages";

const ModifyContainer = ({type, title,content,author,path,selector,imgUrl}:{type:string, title:string,content:string,author?:string,path:string,selector:string,imgUrl:string}) =>{
    const navigate = useNavigate();
    const [ ptitle,setTitle,
        pcontent,setContent,
        ppath,setPath,
        pselector,setSelector,
        pimgUrl,setImgUrl,
        codeData,setCodeData,
        alertFlag, setAlertFlag,
        alertText, setAlertText,
        modifyItem, removeItem, onRemove, onChange, onClick, onImageChange ] = useModify(
            (type === "component") ? {type:"component",param:{title,content,path,selector,imgUrl}} : {type:"document",param:{title,content,author,path,selector,imgUrl}}
        );

    const attr = {title:ptitle,content:pcontent,path:ppath,imgUrl:pimgUrl,selector:pselector,onChange,onClick,onImageChange,mode:"dev",onRemove}

    return (
        <Editor {...attr}></Editor>
    )
}

export default ModifyContainer;