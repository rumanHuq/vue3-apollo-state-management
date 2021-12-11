<script lang="ts" setup>
import { ref } from "vue";
import { useCache } from "./apollo/cache";
import type { LocalCache } from "./apollo/cache/types";
import Button from "./components/button.vue";
const [titleRef, setTitle] = useCache("title");
const [todosRef, setTodos] = useCache("todos");
const title = ref("");
const addTodo = () => {
  if (title.value) {
    setTodos<LocalCache["todos"][number]>({
      actionType: "add",
      incoming: { completed: false, id: new Date().getTime(), title: title.value },
    });
    title.value = "";
  }
};
</script>

<template>
  <div>
    <pre>{{ titleRef.title }}</pre>
    <Button @click="() => setTitle({ actionType: 'replaceWith', incoming: 'poop' })">Change</Button>
    <Button @click="() => setTitle({ actionType: 'toUpper' })">Upper</Button>
    <input v-model="title" type="text" placeholder="...title" />
  </div>
  <div>
    <ul class="list-none">
      <li v-for="(todo, k) in todosRef.todos" :key="k" class="border-2 border-l-amber-900 border-dashed">
        <p>{{ todo.id }}</p>
        <p>{{ todo.title }}</p>
        <p>{{ todo.completed }}</p>
        <Button @click="() => setTodos({ actionType: 'remove', incoming: todo.id })">Remove</Button>
      </li>
    </ul>
    <Button @click="addTodo">Add</Button>
  </div>
</template>
