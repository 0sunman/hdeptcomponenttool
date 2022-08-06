import { forwardRef, ReactNode, RefObject, SyntheticEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { codeSelector, popupImageUploadSelector } from "../../recoils/pages";
import copyClipboard from "../../util/copyClipboard";
import ControlPaneContainer from "../ControlPane";
import ImageUploaderPopup from "../Popup/ImageUploader";

const DevContainer = forwardRef<HTMLIFrameElement,any>((props,ref)=>{/* 일반 */
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const doCopyClipboard = () => {
        if(ref !== null && ref!.current !== null){
            copyClipboard(((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML)
        }
    }
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const openImageUploaderPopup = () =>{
        setVisibleImageUploaderPopup({main:"flex"});
    }
    const onChangeCode = (e:SyntheticEvent) =>{
        setCodeData((e.target as HTMLTextAreaElement).value)
    }
    useEffect(()=>{
        try{
            ((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML = codeData
        }catch(e){

        }
    },[codeData])
    return (
        <div>
            <ImageUploaderPopup/>
            <ControlPaneContainer copyCode={doCopyClipboard} ImageUploader={openImageUploaderPopup}>
                <div className="dev">
                    <select>
                        <option>COS</option>
                        <option>AOS</option>
                    </select>
                    <textarea className='code' onChange={onChangeCode}>{codeData}</textarea>
                </div>
            </ControlPaneContainer>
        </div>
    )
})
export default DevContainer;