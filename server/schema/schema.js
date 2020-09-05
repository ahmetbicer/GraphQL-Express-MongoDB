const graphql = require("graphql")
const User = require("../models/user")
const Product = require("../models/product")
const { Mongoose } = require("mongoose")

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
                return Product.find({sellerId: parent.id})
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
                return User.findById(parent.sellerId)
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
                return User.findById(args.id)
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
                return Product.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product({})
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser: {
            type: UserType,
            args: {
                name: {
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                let user = new User({
                    name: args.name
                })
                return user.save()
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: {
                    type: GraphQLString
                },
                stock: {
                    type: GraphQLInt
                },
                cost: {
                    type: GraphQLInt
                },
                sellerId: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    stock: args.stock,
                    cost: args.cost,
                    sellerId: args.sellerId
                })
                return product.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})