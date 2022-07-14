export type Resolver ={
    [k:string]:{
        [key:string]:(
            parent:any,
            args:{[key:string]:any},
            context:any,
            info:any
        )=>any
    }
}