import {Resolver} from './type'
import {writeDB, DBField, modifyDB} from './../jsondb'
import { v4 } from 'uuid';

const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
const contentResolver:Resolver = {
    Query:{
        contents:(parent,args,{db},info)=>{
            return db.contents
        },
        content:(parent,{id},{db},info)=>{
            const found = db.contents.filter((target:any) =>{ console.log(target.id === id); return target.id === id});
            console.log("found : ",(found !== undefined) ? found : [{id:"1"}]);
            return (found !== undefined) ? found : [{id:"1"}];
        }
    },
    Mutation:{
        addContent:(parent,{title,path,selector,content},{db},info)=>{
            db.contents.push({id:v4(),title,path,selector,content});
            setJSON(db.contents);
            return db.contents;
        },
        modifyContent:(parent,{id,title,path,selector,content},{db},info)=>{
            //console.log(id,title,path,selector,content)
            modifyJSON(id,title,path,selector,content)
            return db.contents;
        },
        removeContent:(parent,{id},{db},info)=>{
            db.contents = db.contents.filter((content:any) => content.id !== id);
            setJSON(db.contents);
            return db.contents;
        }
    }
}
export default contentResolver