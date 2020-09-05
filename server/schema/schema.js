const graphql = require("graphql")
const _ = require("lodash")

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt } = graphql

//dummy data
var users = [
    { id: "1", name: "ahmet" },
    { id: "2", name: "veli" },
    { id: "3", name: "vbt" }
]

var products = [
    { id: "1", name: "product1", stock: 100, cost: 123, sellerId: "1" },
    { id: "2", name: "product2", stock: 110, cost: 456, sellerId: "2" },
    { id: "3", name: "product3", stock: 120, cost: 789, sellerId: "3" }
]

const UserType = new GraphQLObjectType({
    name:"User",
    fields:() => ({ //it needs to be a function because of relation between different objects
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
})

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        stock: { type: GraphQLInt},
        cost: { type: GraphQLInt },
        seller: {
            type: UserType,
            resolve(parent, args){
                return _.find(users, { id: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        user:{
            type: UserType,
            args:{
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){ 
                // function to get data from db or other data source
                return _.find(users, {id: args.id})
            }
        },
        product: {
            type: ProductType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // function to get data from db or other data source
                return _.find(products, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})