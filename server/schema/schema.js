const graphql = require("graphql")

const { GraphQLSchema, GraphqlObjectType, GraphQLString } = graphql

const UserType = new GraphqlObjectType({
    name:"User",
    fields:() => ({ //it needs to be a function because of relation between different objects
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        gender: { type: GraphQLString }
    })
})

const RootQuery = new GraphqlObjectType({
    name: "RootQueryType",
    fields:{
        user:{
            type: UserType,
            args:{
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args){ 
                // function to get data from db
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})