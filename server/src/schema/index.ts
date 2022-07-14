import {gql} from 'apollo-server-express'
import contentSchema from './content'

const linkSchema = gql`
    type Query{
        _:Boolean
    }
    type Mutation{
        _:Boolean
    }
`

export default [linkSchema, contentSchema];