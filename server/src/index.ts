import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';
import resolvers from './resolvers'
import schema from './schema';
import {readDB, DBField} from './jsondb'

(async()=>{
    const server = new ApolloServer({typeDefs:schema, resolvers, context:{
        db : {
            contents:readDB(DBField.CONTENTS)
        }
    }});
    const app = express();
    await server.start();
    server.applyMiddleware({
        app,
        path:"/graphql",
        cors:{
            origin:'*',
            credentials:false
        }
    })

    await app.listen({port:8080});

})();


