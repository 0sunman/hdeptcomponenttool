import {gql} from "graphql-tag";
export const GET_TYPE = gql`
    query GET_TYPE($id:String!){

        type(id:$id){
            id,
            title,
            path,
        }

    }
`

export const GET_TYPES = gql`
    query GET_TYPES{
        types{
            id,
            title,
            path,
        }
    }
`
export const REMOVE_TYPE = gql`
    mutation REMOVE_TYPE($id:String!){
        removeType(id:$id){
            id,
            title,
            path
        }
    }
`

export const ADD_TYPE = gql`
    mutation ADD_TYPE($title: String, $path: String){
        addType(title:$title, path:$path){
            id,
            title,
            path
        }
    }
`