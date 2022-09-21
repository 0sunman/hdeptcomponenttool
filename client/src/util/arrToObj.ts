const arrToObj = (arr:[string,any][])=>
arr.reduce<{[key:string]:any}>((result,[key,value])=>{
    result[key] = value;
    return result;
},{})

export default arrToObj;