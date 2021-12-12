import Joi, { ValidationResult } from "joi";
import { cloneDeep, isNil } from "lodash";
import { apolloCache } from "..";
import { typeDefs } from "../typeDefs";
import { LocalCache, Mutations } from "../types";

export const queueMutation: Mutations["queue"] = ({ actionType, data }) => {
  const query = typeDefs.queue;
  apolloCache.updateQuery<Pick<LocalCache, "queue">>({ query }, (queueCache) => {
    if (!queueCache) return queueCache;
    const cache = cloneDeep(queueCache);

    switch (actionType) {
      case "enqueue": {
        const { error, value }: ValidationResult<number> = Joi.number().required().validate(data);
        if (error) throw error;
        if (isNil(value)) return cache;
        cache.queue.unshift(value);
        break;
      }
      case "dequeue": {
        cache.queue.shift();
        break;
      }
      default:
        break;
    }
    return cache;
  });
};
