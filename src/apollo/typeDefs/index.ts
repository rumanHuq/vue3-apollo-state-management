import { gql, DocumentNode } from "@apollo/client/core";
import type { Query } from "@/@types/gql-definitions";

type TypeDefsKeys = keyof Omit<Query, "__typename">;
type TypeDefs = {
  [key in TypeDefsKeys]?: DocumentNode;
};

const typeDefs: TypeDefs = {
  allPokemon: gql`
    query getAllPokemon($limit: Int!) {
      allPokemon(limit: $limit) {
        sprites {
          back_default
        }
      }
    }
  `,
};

export function getTypeDef(queryName: TypeDefsKeys) {
  const query = typeDefs[queryName];
  if (!query) throw new Error(`query: "${queryName}" does not exist. Please implement`);

  return query;
}
