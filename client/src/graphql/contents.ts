import {gql} from "graphql-tag";
export const GET_CONTENT = gql`
    query GET_CONTENT($id:String!){

        content(id:$id){
            id,
            title,
            content,
            path,
            selector,
            data
        }

    }
`

export const GET_CONTENTS = gql`
    query GET_CONTENTS{
        contents{
            id
            path
            title
            content
            selector
            data
        }
    }
`
export const REMOVE_CONTENT = gql`
    mutation REMOVE_CONTENT($id:String!){
        removeContent(id:$id){
            id,
            title,
            content
        }
    }
`

export const ADD_CONTENTS = gql`
    mutation ADD_CONTENT($title: String, $content: String, $path:String, $selector:String){
        addContent(title:$title, content:$content, path:$path, selector:$selector){
            id,
            title,
            path,
            selector,
            content
        }
    }
`