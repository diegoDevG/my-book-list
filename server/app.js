const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

const dbUrl = 'mongodb+srv://netninja:ninja123@ninja-node.jxpak.mongodb.net/graphql-books?retryWrites=true&w=majority'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }) //second parameter is for avoid deprecation warning
    .then((result) => {
        console.log('connected successfully to db')
        app.listen(4000, () => {
            console.log('server init, listening port 4000')
        })
    })
    .catch((err) => console.log(err))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

