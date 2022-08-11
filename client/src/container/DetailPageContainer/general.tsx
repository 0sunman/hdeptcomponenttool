import { forwardRef, ReactNode, RefObject } from "react";
import { useRecoilState } from "recoil";
import BottomButton from "../../components/Styled/BottomButton";
import { popupImageUploadSelector } from "../../recoils/pages";
import copyClipboard from "../../util/copyClipboard";
import ControlPaneContainer from "../ControlPane";
import ImageUploaderPopup from "../Popup/ImageUploader";

const GeneralContainer = forwardRef<HTMLIFrameElement,any>((props,ref)=>{/* 일반 */
    const doCopyClipboard = () => {
        if(ref !== null && ref!.current !== null){
            copyClipboard(((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML)
        }
    }
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const openImageUploaderPopup = () =>{
        setVisibleImageUploaderPopup({main:"flex"});
    }

    return (
        <div>
            <ImageUploaderPopup/>
            <ControlPaneContainer copyCode={doCopyClipboard} ImageUploader={openImageUploaderPopup}>
                <div className="general">
                </div>
                <BottomButton><button onClick={()=>{}}>코드복사</button></BottomButton>
            </ControlPaneContainer>
        </div>
    )
})
export default GeneralContainer;