import { gql, DocumentNode } from "@apollo/client/core";
import type { Query } from "@/@types/gql-definitions";

type TypeDefsKeys = keyof Omit<Query, "__typename">;
type TypeDefs = {
  [key in TypeDefsKeys]?: DocumentNode;
};

const typeDefs: TypeDefs = {
  Crafts: gql`
    query getCrafts {
      Crafts {
        edges {
          id
          name
        }
      }
    }
  `,
  Craft: gql`
    query getCraft {
      Craft {
        id
        name
        type
        brand
        price
        age
        owner {
          id
        }
      }
    }
  `
};

export function getTypeDef(queryName: TypeDefsKeys) {
  const query = typeDefs[queryName];
  if (!query) throw new Error(`query: "${queryName}" does not exist. Please implement`);

  return query;
}
