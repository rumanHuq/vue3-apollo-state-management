<script setup lang="ts">
import { gql } from "@apollo/client/core";
import { useQuery, useResult } from "@vue/apollo-composable";
const clientQuery = gql`
  query getHello {
    hello
  }
`
const serverQuery = gql`
  query getCrafts {
    Crafts {
      edges {
        id
        name
      }
    }
  }
`

const { result: serverResult } = useQuery(serverQuery)
const { result: clientResult } = useQuery(clientQuery, {}, { fetchPolicy: "cache-only" })
const clientData = useResult(clientResult, (d: any) => d)
const serverData = useResult(serverResult, (d: any) => d.Crafts.edges)
</script>

<template>
  <pre>{{ serverData }}</pre>
  <pre>{{ clientData }}</pre>
</template>
