//This file have three responsabilities:
// 1. define types 
// 2. define relationships beteen types
// 3. define root queries


const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
const books = [
    { name: 'Name fo the wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // code to get data from db / other source
                return books.find(({ id }) => id === args.id)

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});