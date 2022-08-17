import { useForm } from "react-hook-form";
import axios from "axios";
import copyClipboard from "../../util/copyClipboard";
import React from "react";
import { useRecoilState } from "recoil";
import { alertSelector, alertTextSelector } from "../../recoils/pages";

const ImageUploader = ({onImageChange}:{onImageChange:any}) =>{

    type ImageForm = {
        image:FileList
    }
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const {register, handleSubmit, submit} = useForm<ImageForm>();
    const onValid = async ({image}:ImageForm) =>{
        setAlertFlag(true)
        setAlertText("이미지를 업로드 중입니다.");
        if(image && image.length > 0){
            const {
                data : {uploadURL}
            } = await axios.get("https://zerosunshop.herokuapp.com/api/uploadImage")
            console.log(uploadURL);
            const formData = new FormData();
            formData.append("file", image[0], "test");

            const { data } = await axios.post(uploadURL, formData);

            onImageChange({imageUrl:data.result.variants[0]});
        }
    }

    return(
        <form className='imageUploader' onSubmit={handleSubmit(onValid)}>
            <input id='Imagefile' type="file" {...register("image")}/>
            <input type="submit" value="이미지 업로드"></input>
        </form>
    )


}

export default ImageUploader;