import { createHttpLink, ApolloClient } from "@apollo/client/core";
import { cache } from "./cache";
const httpLink = createHttpLink({ uri: "https://dex-server.herokuapp.com/" });

export const client = new ApolloClient({ link: httpLink, cache });
