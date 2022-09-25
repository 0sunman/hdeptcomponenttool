import * as fs from "fs";
import { resolve } from "path";

export enum DBField{
    CONTENTS="contents",
}
const BASEPATH = resolve();
const filenames = {
    [DBField.CONTENTS]:resolve(BASEPATH, "src/jsondb/datas/contents.json"),
}


export const readDB = (selectedDB:DBField):any => {
    let result = ""
    try{
        result = JSON.parse(fs.readFileSync(filenames[selectedDB],"utf-8"))
    }catch(e){
        console.log(e);
    }
    return result;
}
export const writeDB = (selectedDB:DBField, data:any):Boolean => {
    try{
        fs.writeFileSync(filenames[selectedDB],JSON.stringify(data))
        return true
    }catch(e){
        console.log(e);
        return false
    }
}
export const modifyDB = (selectedDB:DBField,id:string, title:string, path:string, selector:string, data:any):Boolean => {
    try{
        console.log("MODIFY",id)
        const originData = readDB(selectedDB);
        const afterData = originData.map((element:any,idx:number)=>{
            if(element.id === id){
                console.log("MODIFY",{id, title, path, selector})
                return {...element, title, content:data, path, selector}
            }else{
                return element;
            }
        })

        fs.writeFileSync(filenames[selectedDB],JSON.stringify(afterData))
        return true
    }catch(e){
        console.log(e);
        return false
    }
}