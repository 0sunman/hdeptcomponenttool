import {gql} from 'apollo-server-express'

const contentSchema = gql`
    type Content {
        id:String!,
        path:String,
        selector:String,
        title:String,
        content:String,
        data:String,
        imgUrl:String
    }
    extend type Query{
        contents:[Content]
        content(id:String!): [Content]
    }
    extend type Mutation{
        addContent(title: String, content: String, path:String, selector:String, imgUrl:String):[Content]
        modifyContent(id:String!,title: String, content: String, path:String, selector:String, imgUrl:String):[Content]
        removeContent(id:String!):[Content]
    }
`

export default contentSchema;