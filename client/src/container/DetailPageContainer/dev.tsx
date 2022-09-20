import { forwardRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { alertSelector, codeSelector, popupImageUploadSelector } from "../../recoils/pages";
import copyClipboard from "../../util/copyClipboard";
import ControlPaneContainer from "../ControlPane";
import ImageUploaderPopup from "../Popup/ImageUploader";
import ModifyContainer from "../WriteContainer/modify";

const DevContainer = forwardRef<HTMLIFrameElement,any>((props,ref)=>{/* 일반 */

    const {title,content,path,selector,imgUrl} = props.data.content[0]; 
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const [alertFlag, setAlertFlag] =useRecoilState<boolean>(alertSelector);
    
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
    const attr = {title,content,path,selector,imgUrl};

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