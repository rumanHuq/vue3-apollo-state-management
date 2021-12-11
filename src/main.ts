import "./index.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { client } from "./apollo";

createApp({
  setup() {
    provide(DefaultApolloClient, client);
  },
  render: () => h(App),
}).mount("#app");
