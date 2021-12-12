import Joi, { ValidationResult } from "joi";
import { cloneDeep } from "lodash";
import { apolloCache } from "..";
import { typeDefs } from "../typeDefs";
import { Todo, Mutations, LocalCache } from "../types";

const TodoSchema = Joi.object<Todo>({
  id: Joi.number().required(),
  completed: Joi.boolean().required(),
  title: Joi.string().required(),
}).required();

export const todosMutation: Mutations["todos"] = ({ data, actionType }) => {
  const query = typeDefs.todos;
  apolloCache.updateQuery<Pick<LocalCache, "todos">>({ query }, (cachedTodos) => {
    if (!cachedTodos) return cachedTodos;
    const cache = cloneDeep(cachedTodos);
    switch (actionType) {
      case "add": {
        const { error, value } = TodoSchema.validate(data);
        if (error) throw error;
        if (!value) return cache;
        cache.todos.push(value);
        return cache;
      }
      case "remove": {
        const { error, value }: ValidationResult<number> = Joi.number().required().validate(data);
        if (error) throw error;

        cache.todos = cache.todos.filter((todo) => todo.id !== value);
        return cache;
      }
      default:
        return cache;
    }
  });
};
