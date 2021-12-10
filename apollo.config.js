module.exports = {
  client: {
    service: {
      name: "dex",
      url: "https://dex-server.herokuapp.com/",
    },
    includes: ["src/apollo/typeDefs/**/*.ts"],
  },
};
