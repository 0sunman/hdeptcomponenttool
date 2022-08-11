import {gql} from "graphql-tag";
export const GET_CONTENT = gql`
    query GET_CONTENT($id:String!){

        content(id:$id){
            id,
            title,
            content,
            path,
            selector,
            data,
            imgUrl
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
            data,
            imgUrl
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
    mutation ADD_CONTENT($title: String, $content: String, $path:String, $selector:String, $imgUrl:String){
        addContent(title:$title, content:$content, path:$path, selector:$selector, imgUrl:$imgUrl){
            id,
            title,
            path,
            selector,
            content,
            imgUrl
        }
    }
`

export const MODIFY_CONTENT = gql`
    mutation Mutation($id: String!, $content: String, $path: String, $selector: String, $title: String, $imgUrl:String) {
        modifyContent(id: $id, content: $content, path: $path, selector: $selector, title: $title, imgUrl:$imgUrl) {
        id
        path
        selector
        title
        content
        data
        imgUrl
        }
  }
`