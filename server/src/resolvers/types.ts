import {Resolver} from './type'
import {writeDB, DBField, modifyDB} from '../jsondb'
import { v4 } from 'uuid';
import { tokenToString } from 'typescript';

const setJSON = (data:any) => writeDB(DBField.TYPES, data);
const modifyJSON = (id:string, path:any,selector:any,type:any) => modifyDB(DBField.TYPES, id, path,selector,type);
const typeResolver:Resolver = {
    Query:{
        types:(parent,args,{db},info)=>{
            return db.types
        },
        type:(parent,{id},{db},info)=>{
            const found = db.types.filter((target:any) =>{ console.log(target.id === id); return target.id === id});
            return (found !== undefined) ? found : [{id:"1"}];
        }
    },
    Mutation:{
        addType:(parent,{title,path},{db},info)=>{
            if(db.types.filter((path:any) => path.title === title).length >= 1){
                throw new Error("중복입니다!")
                return db.types;
            }
            db.types.push({id:v4(),title,path});
            
            console.log(db.types);
            setJSON(db.types);
            return db.types;
        },
        removeType:(parent,{id},{db},info)=>{
            db.types = db.types.filter((path:any) => path.id !== id);
            setJSON(db.types);
            return db.types;
        }
    }
}
export default typeResolver