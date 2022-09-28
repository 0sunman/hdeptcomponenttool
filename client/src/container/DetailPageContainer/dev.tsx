import { forwardRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import useLogin from "../../lib/useLogin";
import { alertSelector, codeSelector, IFrameDOMSelector, popupImageUploadSelector, UserLoginState } from "../../recoils/pages";
import copyClipboard from "../../util/copyClipboard";
import ControlPaneContainer from "../ControlPane";
import ImageUploaderPopup from "../Popup/ImageUploader";
import ModifyContainer from "../WriteContainer/modify";

const DevContainer = forwardRef<HTMLIFrameElement,any>((props,ref)=>{/* 일반 */

    const [isLogin] = useLogin();
    const [isLogin2, setIsLogin] = useRecoilState(UserLoginState);
    const {title,content,path,selector,imgUrl} = props.data.content[0]; 
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const [alertFlag, setAlertFlag] =useRecoilState<boolean>(alertSelector);
    const [iframeDOM,setIframeDOM]:any[] = useRecoilState(IFrameDOMSelector);
    
    const doCopyClipboard = () => {
        if(ref !== null && ref!.current !== null){
            copyClipboard(((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML)
        }
    }
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const openImageUploaderPopup = () =>{
        setVisibleImageUploaderPopup({main:"flex"});
    }
    useEffect(()=>{
        try{
            ((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML = codeData
        }catch(e){

        }
    },[codeData])

    
    useEffect(()=>{
        try{
            ((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML = codeData
        }catch(e){

        }
    })
    useEffect(()=>{
        setIsLogin(isLogin);
    },[isLogin]);
    
    useEffect(()=>{
        return ()=>{
            setIframeDOM([])
        }
    },[])
    const type = "component";
    const attr = {type,title,content,path,selector,imgUrl};

    return (
        <div>
            <ImageUploaderPopup/>
            <ControlPaneContainer copyCode={doCopyClipboard} ImageUploader={openImageUploaderPopup}>
                <div className="dev">
                    <ModifyContainer {...attr}></ModifyContainer>
                </div>
            </ControlPaneContainer>
        </div>
    )
})
export default DevContainer;