import { gql } from "@apollo/client/core";

export const ALL_POKEMON = gql`
  query getAllPokemon($limit: Int!) {
    allPokemon(limit: $limit) {
      sprites {
        back_default
      }
    }
  }
`;
