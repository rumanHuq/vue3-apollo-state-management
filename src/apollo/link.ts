import { createHttpLink, ApolloLink, from } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ response, graphQLErrors, networkError, operation: { operationName, variables } }) => {
  const queryInfo = { name: operationName, variables };
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(JSON.stringify({ "[GraphQL error]": { queryInfo, message, locations, path, response } }, null, 2));
    });
  }

  if (networkError) {
    console.error(JSON.stringify({ "[Network error]": { queryInfo, networkError, response } }, null, 2));
  }
});
const middleware = new ApolloLink((operation, forward) => {
  console.info(`Fetching: ${operation.operationName}`);

  return forward(operation);
});

const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    console.info("Completed: ", operation.operationName);
    return response;
  });
});

const httpLink = createHttpLink({ uri: "http://localhost:3000/graphql" });

export const link = from([errorLink, middleware, afterware, httpLink]);
