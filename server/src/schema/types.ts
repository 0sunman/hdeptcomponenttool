import {gql} from 'apollo-server-express'

const typeSchema = gql`
    type Type {
        id:String!,
        title:String,
        path:String,
        selector:String,
    }
    extend type Query{
        types:[Type]
        type(id:String!): [Type]
    }
    extend type Mutation{
        addType(title:String, path: String, selector:String):[Type]
        removeType(id:String!):[Type]
    }
`

export default typeSchema;