
## What is this?

This code is a simple graphql implementation for my [medium](https://medium.com/hardwareandro/graphql-basics-with-express-and-mongodb-5a69a379db14) article.

## How To Use?

In order to use this project you need node and mongodb installed on your device.

If you don't want to use local mongodb instance, you can use online services that hosts mongodb instances such as `mlab`.

### Installation steps

1. Clone this repo
2. Run `npm install` in the root of the folder to install dependencies.
3. Create a mongodb instance with name `graphqldb` (or change the connection string in app.js) 
4. Run `node app.js` 
5. Go to `localhost:3000/graphql` you will see a user interface to play around with different queries and mutations 


### Root Queries

There are 4 different root queries to get data from mongodb. By nature of graphql all of the root queries can get different fields defined in schemas. These are just samples. 


```
{
  users{ 
    name
    products{
        name
        stock
    }
  }
}
# get all users and return their names and products
```
```
{
  products{ 
    name
    stock
    cost
    seller
  }
}
# get all products and return name, stock, cost and seller
```

```
{
  user(id: "1"){ 
    name
  }
}
# get user with id 1 and return the name field
```

```
{
  product(id: "1"){ 
    name
    stock
    cost
  }
}
# get product with id 1 and return the name, stock and cost
```

### Mutations

There are 2 mutations which can add an user or a product.

```
mutation{
  addUser(name: "<name>"){
    name
  }
}
```

```
mutation{
  addProduct(name: "<name>", stock: <stock>, cost: <cost>, sellerId: "<sellerId>"){
    name
    stock
  }
}
# add a product and if the mutation successful return name and stock
```
