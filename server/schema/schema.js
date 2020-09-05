const graphql = require("graphql")
const User = require("../models/user")
const Product = require("../models/product")

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql


const UserType = new GraphQLObjectType({
    name:"User",
    fields:() => ({ //it needs to be a function because of relation between different objects
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent,args){
                // return _.filter(products, { sellerId: parent.id })
            }
        }
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
                // return _.find(users, { id: parent.id })
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
                // return _.find(users, {id: args.id})
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
                // return _.find(products, { id: args.id })
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // return users
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                // return products
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})