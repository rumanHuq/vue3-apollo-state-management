import Joi, { ValidationResult } from "joi";
import { cloneDeep } from "lodash";
import { typeDefs } from "./typeDefs";
import { LocalCache, Mutations, Todo } from "./types";
import { cache } from ".";

const TodoSchema = Joi.object<Todo>({
  id: Joi.number().required(),
  completed: Joi.boolean().required(),
  title: Joi.string().required(),
}).required();

export const mutations: Mutations = {
  title(prop) {
    const { incoming, actionType } = prop;
    const query = typeDefs.title;
    cache.updateQuery<LocalCache>({ query }, (data) => {
      if (!data) return data;
      const cache = cloneDeep(data);
      switch (actionType) {
        case "replaceWith": {
          if (typeof incoming !== "string") return data;
          cache.title = incoming;
          break;
        }
        case "toUpper": {
          cache.title = cache.title.toUpperCase();
          break;
        }
        default:
          break;
      }
      return cache;
    });
  },
  todos(prop) {
    const { incoming, actionType } = prop;
    const query = typeDefs.todos;
    cache.updateQuery<LocalCache>({ query }, (data) => {
      if (!data) return data;
      const cache = cloneDeep(data);
      switch (actionType) {
        case "add": {
          const { error, value } = TodoSchema.validate(incoming);
          if (error) throw error;
          if (!value) return cache;
          cache.todos.push(value);
          return cache;
        }
        case "remove": {
          const { error, value }: ValidationResult<number> = Joi.number().required().validate(incoming);
          if (error) throw error;

          cache.todos = cache.todos.filter((todo) => todo.id !== value);
          return cache;
        }
        default:
          return cache;
      }
    });
  },
};
