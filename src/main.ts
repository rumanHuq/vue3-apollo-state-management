import { createHttpLink,ApolloClient } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp,provide,h } from "vue";
import App from "./App.vue";
import {cache} from "./cache"
const httpLink = createHttpLink({uri: "http://localhost:3000/graphql"})
const client = new ApolloClient({link: httpLink, cache})

createApp({
  setup(){provide(DefaultApolloClient, client)},
  render: () => h(App)
}).mount("#app");
