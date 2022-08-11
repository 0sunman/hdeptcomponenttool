import { useForm } from "react-hook-form";
import axios from "axios";
import copyClipboard from "../../util/copyClipboard";
import React from "react";

const ImageUploader = ({onImageChange}:{onImageChange:any}) =>{

    type ImageForm = {
        image:FileList
    }
    const {register, handleSubmit} = useForm<ImageForm>();
    const onValid = async ({image}:ImageForm) =>{
        if(image && image.length > 0){
            const {
                data : {uploadURL}
            } = await axios.get("/api/uploadImage")
            console.log(uploadURL);
            const formData = new FormData();
            formData.append("file", image[0], "test");

            const { data } = await axios.post(uploadURL, formData);

            onImageChange({imageUrl:data.result.variants[0]});

        }
    }

    return(
        <form onSubmit={handleSubmit(onValid)}>
            <input type="file" {...register("image")}/>
            <input type="submit"></input>
            <input type="hidden"></input>
        </form>
    )


}

export default ImageUploader;