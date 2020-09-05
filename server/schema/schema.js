const graphql = require("graphql")
const _ = require("lodash")

const { GraphQLSchema, GraphqlObjectType, GraphQLString } = graphql

//dummy data
var users = [
    { id: "1", name: "ahmet" },
    { id: "2", name: "veli" },
    { id: "3", name: "vbt" }
]

const UserType = new GraphqlObjectType({
    name:"User",
    fields:() => ({ //it needs to be a function because of relation between different objects
        id: { type: GraphQLString },
        name: { type: GraphQLString },
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
                // function to get data from db or other data source
                return _.find(users, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})