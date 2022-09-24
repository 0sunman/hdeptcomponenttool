import { useNavigate } from "react-router-dom";
import Editor from "../../components/Editor";
import useWriteHooks from "../../lib/useWrite";

const writeContainer = () =>{
    const navigate = useNavigate();
    const [ 
        title, setTitle, content, setContent, 
        path, setPath, selector, setSelector, imgUrl, setImgUrl, page, setPage,
        onChange, onClick, onImageChange
    
    ] = useWriteHooks();

    const attr = {title,content,path,selector,onChange,onClick,onImageChange,imgUrl,mode:"gen"}

    return (
        <Editor {...attr}></Editor>
    )
}

export default writeContainer;