import * as fs from "fs";
import { resolve } from "path";

export enum DBField{
    CONTENTS="contents"
}
const BASEPATH = resolve();
console.log(BASEPATH)
const filenames = {
    [DBField.CONTENTS]:resolve(BASEPATH, "src/jsondb/datas/contents.json")
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
