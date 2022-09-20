import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState } from "recoil";
import { alertSelector, alertTextSelector } from "../../recoils/pages";

const ImageUploader = ({onImageChange}:{onImageChange:any}) =>{

    type ImageForm = {
        image:FileList
    }
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const {register, handleSubmit} = useForm<ImageForm>();
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
            setAlertText("이미지를 업로드가 완료되었습니다!");
        }else{
            setAlertText("이미지 업로드 실패 ㅠㅠ");
        }
    }

    return(
        <form className='imageUploader'>
            <input id='Imagefile' type="file" {...register("image")} onChange={e=>{
                handleSubmit(onValid({image:e.target.files}));
            }}/>
        </form>
    )


}

export default ImageUploader;