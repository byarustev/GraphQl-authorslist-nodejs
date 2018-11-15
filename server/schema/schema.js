const graphQl= require('graphql');

const {GraphQLObjectType, GraphQLString} = graphQl; // dis-structure, grab that from the object

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        genre: {type:GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: ()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                // code to get data from db or other source
            }
        }
    }
});




