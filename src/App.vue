<script lang="ts" setup>
import type { Cache } from "./cache"
import { useCache } from "./cache"
const [titleRef, setTitle] = useCache("title")
const [todosRef, setTodos] = useCache("todos")
const addTodo = (title: string) => {
  setTodos<Cache['todos'][number]>({ type: 'add', payload: { completed: false, id: todosRef.value.todos.length + 1, title } })
}
</script>

<template>
  <div>
    <pre>{{ titleRef.title }}</pre>
    <button @click="() => setTitle({ type: 'replaceWith', payload: 'poop' })">Change</button>
    <button @click="() => setTitle({ type: 'toUpper' })">Upper</button>
  </div>
  <p>....</p>
  <div>
    <ul>
      <li v-for="(todo, k) in todosRef.todos" :key="k">
        <p>{{ todo.id }}</p>
        <p>{{ todo.title }}</p>
        <p>{{ todo.completed }}</p>
      </li>
    </ul>
    <button @click="() => addTodo('TBD')">Add</button>
    <button @click="() => setTodos<number>({ type: 'remove', payload: 2 })">Remove</button>
  </div>
</template>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;

  li {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
    border: 1px solid;
    width: 400px;
    padding: 1rem;
  }
}
</style>
