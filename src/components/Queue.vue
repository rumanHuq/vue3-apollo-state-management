<script lang="ts" setup>
import { useCache } from "@/apollo/cache";
import Button from "./Button.vue";

const [queueRef, setQueue] = useCache("queue");
const addQueue = () =>
  setQueue({
    actionType: "enqueue",
    data: queueRef.value.queue.length + 1,
  });
</script>
<template>
  <div v-if="queueRef.queue.length > 0" class="queue">
    <span v-for="(item, i) in queueRef.queue" :key="i">{{ item }}</span>
  </div>
  <div v-else class="queue"><span>Start buy enqueuing some item</span></div>
  <Button @click="addQueue">Enqueue</Button>
  <Button class="ml-2" :disabled="queueRef.queue.length === 0" @click="() => setQueue({ actionType: 'dequeue' })">Dequeue</Button>
</template>
<style lang="scss">
.queue {
  display: flex;
  gap: 1rem;

  span {
    align-items: center;
    display: inline-flex;
    height: 4rem;
    justify-content: center;
  }
}
</style>
