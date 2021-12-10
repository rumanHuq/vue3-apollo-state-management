<script lang="ts" setup>
import { useQuery } from "@vue/apollo-composable";
import { GetAllPokemonQuery, GetAllPokemonQueryVariables } from "./Interfaces/gql-definitions";
import { ALL_POKEMON } from "./apollo/typeDefs";
import { useCache, Cache } from "./cache";
const [titleRef, setTitle] = useCache("title");
const [todosRef, setTodos] = useCache("todos");
const { result, error, loading } = useQuery<GetAllPokemonQuery, GetAllPokemonQueryVariables>(ALL_POKEMON, { limit: 20 });
const addTodo = (title: string) => {
  setTodos<Cache["todos"][number]>({
    type: "add",
    payload: { completed: false, id: todosRef.value.todos.length + 1, title },
  });
};
</script>

<template>
  <div>
    <pre>{{ titleRef.title }}</pre>
    <button @click="() => setTitle({ type: 'replaceWith', payload: 'poop' })">Change</button>
    <button @click="() => setTitle({ type: 'toUpper' })">Upper</button>
  </div>
  <p>....</p>
  <div>
    <pre>{{ loading || error?.message ? "wait..." : result?.allPokemon }}</pre>
    <ul>
      <li v-for="(todo, k) in todosRef.todos" :key="k">
        <p>{{ todo.id }}</p>
        <p>{{ todo.title }}</p>
        <p>{{ todo.completed }}</p>
      </li>
    </ul>
    <button @click="() => addTodo('TBD')">Add</button>
    <button @click="() => setTodos({ type: 'remove', payload: 2 })">Remove</button>
  </div>
</template>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;

  li {
    padding: 1rem;
    width: 400px;
  }

  li:not(:last-child) {
    margin-bottom: 2rem;
  }
}
</style>
