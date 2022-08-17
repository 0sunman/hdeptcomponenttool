import React from 'react';
import PopupContainer from ".";
import { useRecoilState } from "recoil";
import { popupImageUploadSelector } from "../../recoils/pages";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import copyClipboard from "../../util/copyClipboard";

const ImageUploaderPopup = () =>{
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const InitPopupDisplay = {main:true, general:"none",hyundai:"none"}
    const closeImageUploaderPopup = () =>{ 
        setVisibleImageUploaderPopup({...InitPopupDisplay,main:false}); 
    }
    
    const doInnerHyundai = () =>{ 
        setVisibleImageUploaderPopup({...InitPopupDisplay,hyundai:"block"}); 
    }
    
    const doExHyundai = () =>{ 
        setVisibleImageUploaderPopup({...InitPopupDisplay,general:"block"}); 
    }


    type ImageForm = {
        image:FileList
    }
    const {register, handleSubmit} = useForm<ImageForm>();
    const onValid = async ({image}:ImageForm) =>{
        if(image && image.length > 0){
            
            const {
                data : {uploadURL}
            } = await axios.get("https://zerosunshop.herokuapp.com/uploadImage")
            console.log(uploadURL);
            const formData = new FormData();
            formData.append("file", image[0], "test");

            const { data } = await axios.post(uploadURL, formData);

            copyClipboard(data.result.variants[0])
            alert("업로드된 이미지가 클립보드에 복사되었습니다.");
        }
    }

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
                    <span>파일 업로드 :</span>
                    <form onSubmit={handleSubmit(onValid)}>
                        <input type="file" {...register("image")}/>
                        <input type="submit"></input>
                    </form>
                    <input type="text" id='imgUrl'/>
                </div>
            </div>
        </PopupContainer>
    )


}

export default ImageUploaderPopup;