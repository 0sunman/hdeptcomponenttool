import {gql} from "graphql-tag";
export const GET_DOCUMENT = gql`
    query GET_DOCUMENT($id:Int!){
        document(id:$id){
            id,
            title,
            content,
            author,
            path,
            selector,
            imgUrl
        }

    }
`

export const GET_DOCUMENT_LIKE = gql`
    query GET_DOCUMENT_LIKE($title:String!){
        documentslike(id:$title){
            id,
            title,
            content,
            author,
            path,
            selector,
            imgUrl
        }

    }
`

export const GET_DOCUMENTS = gql`
    query GET_DOCUMENTS{
        documents{
            id
            title
            content
            author
            path
            selector
            imgUrl
        }
    }
`
export const REMOVE_DOCUMENT = gql`
    mutation REMOVE_DOCUMENT($id:Int!){
        removeDocument(id:$id){
            id,
            title,
            content
        }
    }
`

export const ADD_DOCUMENT = gql`
    mutation ADD_DOCUMENT($title: String, $content: String, $selector:String, $imgUrl:String, $path:String, $author:String){
        addDocument(title:$title, content:$content, selector:$selector, imgUrl:$imgUrl, path:$path, author:$author){
            id,
            title,
            selector,
            content,
            path,
            author,
            imgUrl
        }
    }
`

export const MODIFY_DOCUMENT = gql`
    mutation Mutation($id: Int!, $content: String, $selector: String, $title: String, $imgUrl:String, $path:String, $author:String) {
        modifyDocument(id: $id, content: $content, selector: $selector, title: $title, imgUrl:$imgUrl, path:$path, author:$author) {
            id
            selector
            title
            content
            path,
            author
            imgUrl
        }
  }
`