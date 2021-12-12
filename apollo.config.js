module.exports = {
  client: {
    service: {
      name: "dex",
      url: "http://localhost:3000/graphql",
    },
    includes: ["src/apollo/typeDefs/**/*.ts"],
  },
};
