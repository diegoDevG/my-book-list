//This file have three responsabilities:
// 1. define types 
// 2. define relationships beteen types
// 3. define root queries


const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID, // Allows to pass string or number as id in the query
    GraphQLInt,
    GraphQLList
} = graphql;

//dummy data
const books = [
    { name: 'Name fo the wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The color of Magin', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Fantastic Light', genre: 'Fantasy', id: '6', authorId: '3' }

]

const authors = [
    { name: 'Patrick Rothfuss', age: '44', id: '1' },
    { name: 'Brandon Sanderson', age: '42', id: '2' },
    { name: 'Terry Pratcher', age: '66', id: '3' }

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(({ id }) => id === parent.id)
            }
        },

    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(({ authorId }) => authorId === parent.id)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return books.find(({ id }) => id === args.id)

            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(({ id }) => id === args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});