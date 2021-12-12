import { gql } from "@apollo/client/core";
import { TypeDefs } from "./types";

/* NOTE: these are @client Queries */
export const typeDefs: TypeDefs = {
  todos: gql`
    query getTodos {
      todos
    }
  `,
  queue: gql`
    query getQueue {
      queue
    }
  `,
};
