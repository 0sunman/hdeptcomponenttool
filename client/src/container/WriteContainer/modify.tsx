import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Editor from "../../components/Editor";
import { MODIFY_CONTENT, REMOVE_CONTENT } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, codeSelector, IdSelector, writeSelector } from "../../recoils/pages";

const ModifyContainer = ({title,content,path,selector,imgUrl}:{title:string,content:string,path:string,selector:string,imgUrl:string}) =>{
    const navigate = useNavigate();
    const [ptitle,setTitle] = useState(title);
    const [pcontent,setContent] = useState(content);
    const [ppath,setPath] = useState(path);
    const [pselector,setSelector] = useState(selector);
    const [pimgUrl,setImgUrl] = useState(imgUrl);
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const [alertFlag, setAlertFlag] =useRecoilState<boolean>(alertSelector);
    const [alertText, setAlertText] =useRecoilState<string>(alertTextSelector);

    const setPage = useSetRecoilState(writeSelector);
    const id:string = useRecoilValue(IdSelector);
    const {mutate:modifyItem} = useMutation(()=>graphqlFetcher(MODIFY_CONTENT,{id, title:ptitle,path:ppath,selector:pselector,imgUrl:pimgUrl,content:pcontent}),{
        onSuccess:(data)=>{
            setAlertFlag(true)
            setAlertText("수정이 완료되었습니다.")
            setTimeout(()=>{
                setAlertFlag(false);
            },3000)
        },
        onError:(e)=>{
            setAlertText("이런.. 수정하다가 에러가 나버렸습니다.")
            throw new Error("이런 수정하다가 에러가 나버렸습니다.")
            console.log(e);
        }
    });
    const {mutate:removeItem} = useMutation((id:string)=>graphqlFetcher(REMOVE_CONTENT,{id}),{
        onSuccess:()=>{
            setAlertText("삭제 되었습니다. 3초후 홈으로 돌아가요.")
            setTimeout(()=>{
                navigate("/")
            },3000)
        }
    });
    const onRemove = useCallback(() =>{
        setAlertFlag(true)
        setAlertText("삭제하겠습니다!");
        setTimeout(()=>{
            if(confirm("그런데... 진짜 삭제하실건가요?") == true){
                removeItem(id);
                setAlertText("그럼.. 진짜 삭제하겠습니다! (삭제중)");
            }else{
                setAlertText("확인을 누르시면 작업하시던 내용으로 돌아갑니다 :)");
            }
        },1000)
    },[])
    const onChange = useCallback((e:SyntheticEvent) =>{
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
    },[])
    useEffect(()=>{
        setCodeData(pcontent)
    },[pcontent])
    
    const onClick = useCallback(()=>{
        setAlertFlag(true)
        setAlertText("수정할게요!");
        setTimeout(()=>{
            if(confirm("그런데... 진짜 수정하실건가요? 원복하는 기능은 아직 없어요 ㅠㅠ") == true){
                setAlertText("진짜.. 수정작업을 진행 중 입니다.");
                modifyItem();
            }else{
                setAlertText("확인을 누르시면 작업하시던 내용으로 돌아갑니다 :)");
            }
        },1000)
    },[])
    
    const onImageChange = ({imageUrl}:{imageUrl:string})=>{
        setImgUrl(imageUrl);
        setAlertText("이미지가 업데이트 되었습니다.");
    }

    const attr = {title:ptitle,content:pcontent,path:ppath,imgUrl:pimgUrl,selector:pselector,onChange,onClick,onImageChange,mode:"dev",onRemove}

    return (
        <Editor {...attr}></Editor>
    )
}

export default ModifyContainer;