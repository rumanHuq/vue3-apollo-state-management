import { Mutations } from "../types";
import { queueMutation } from "./queueMutation";
import { todosMutation } from "./todosMutation";

export const mutations: Mutations = {
  todos: todosMutation,
  queue: queueMutation,
};
