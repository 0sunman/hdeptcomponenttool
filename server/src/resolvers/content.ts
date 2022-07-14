import {Resolver} from './type'
import {writeDB, DBField} from './../jsondb'
import { v4 } from 'uuid';

const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);

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
        addContent:(parent,{title,content},{db},info)=>{
            db.contents.push({id:v4(),title,content});
            setJSON(db.contents);
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