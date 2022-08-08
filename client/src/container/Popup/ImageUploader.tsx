import PopupContainer from ".";
import { useRecoilState } from "recoil";
import { popupImageUploadSelector } from "../../recoils/pages";
import { useEffect } from "react";

const ImageUploaderPopup = () =>{
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const InitPopupDisplay = {general:"none",hyundai:"none"}
    const closeImageUploaderPopup = () =>{ 
        setVisibleImageUploaderPopup({...InitPopupDisplay,main:"none"}); 
        console.log(visibleImageUploaderPopup);
    }
    
    const doInnerHyundai = () =>{ 
        setVisibleImageUploaderPopup({...InitPopupDisplay,hyundai:"block"}); 
        console.log(visibleImageUploaderPopup);
    }
    
    const doExHyundai = () =>{ 
        setVisibleImageUploaderPopup({...InitPopupDisplay,general:"block"}); 
        console.log(visibleImageUploaderPopup);
    }

    useEffect(()=>{
        doInnerHyundai();
    },[])

    return(
        <PopupContainer visible={visibleImageUploaderPopup.main} onClose={closeImageUploaderPopup}>
            <div>
        
                <h2>이미지 업로더</h2>
                <div>
                    <button onClick={doInnerHyundai}>현대백화점 내부</button>
                    <button onClick={doExHyundai}>현대백화점 외부</button>
                </div>
                <div style={{display:visibleImageUploaderPopup.hyundai}}>
                    <a href="http://tis.thehyundai.com/front/daumeditor/editor6.jsp#" target="_blank">[ 클릭 ]</a>
                    <span>다음에디터에서 이미지 업로드 이후, html로 변환해서 URL을 가지고 오세요!</span>
                </div>                        
                <div style={{display:visibleImageUploaderPopup.general}}>
                    <span>파일 업로드 :</span><input type="file"/><input type="text" id='imgUrl'/>
                </div>
            </div>
        </PopupContainer>
    )


}

export default ImageUploaderPopup;