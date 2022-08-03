import {gql} from 'apollo-server-express'

const contentSchema = gql`
    type Content {
        id:String!,
        title:String,
        content:String,
        data:String
    }
    extend type Query{
        contents:[Content]
        content(id:String!): [Content]
    }
    extend type Mutation{
        addContent(title: String, content: String):[Content]
        modifyContent(id:String!, content: String!):[Content]
        removeContent(id:String!):[Content]
    }
`

export default contentSchema;