const graphQl= require('graphql');
const _ = require('lodash');
const {GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema} = graphQl; // dis-structure, grab that from the object

const Book = require('../models/book');
const Author = require('../models/author');

// let books = [
//     {name:'trial book', genre:'fantasy',id:'4', authorId:'2'},
//     {name:'test book', genre:'zee world',id:'3', authorId: '3'},
//     {name:'help book', genre:'cartoon network',id:'2', authorId:'1'},
//     {name:'this is me', genre:'fantasy',id:'4', authorId:'2'},
//     {name:'love love love', genre:'zee world',id:'3', authorId: '2'},
//     {name:'life love hate', genre:'cartoon network',id:'2', authorId:'1'}
// ];
//
// let authors = [
//     {name:'Byarugaba Stephen', age:25,id:'3'},
//     {name:'Moses Sali', age:35, id:'2'},
//     {name:'Bobi Wine', age:37, id:'1'}
// ];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent,args){
                // return _.find(authors,{id:parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: ()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // code to get data from db or other source
                // return _.find(books,{id:args.id});
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id});
                return Author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books;
                return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type: GraphQLNonNull (GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
               return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});
