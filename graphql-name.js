const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = require("graphql/type");

const ng = require("name-generator-mongoose");

var nameType = new GraphQLObjectType({
  name: "name",
  description: "name item",
  fields: () => ({
    firstName: {
      type: GraphQLString,
      description: "First Name"
    },
    surname: {
      type: GraphQLString,
      description: "Last Name"
    },
    gender: {
      type: GraphQLString,
      description: "Gender"
    }
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      name: {
        type: new GraphQLList(nameType),
        args: {
          gender: {
            name: "gender",
            type: GraphQLString
          },
          top: {
            name: "top",
            type: GraphQLInt
          }
        },
        resolve: (root, { gender, top }, source, fieldASTs) => {
          var foundItems = new Promise((resolve, reject) => {
            options = {
              gender: gender,
              top: top
            };
            ng
              .generateName(options)
              .then(name => {
                return resolve([name]);
              })
              .catch(err => {
                console.error(err);
                return reject(err);
              });
          });
          return foundItems;
        }
      }
    }
  })
});

exports.schema = schema;
