import "./index.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { apolloClient } from "./apollo";

const app = createApp({
  setup: () => provide(DefaultApolloClient, apolloClient),
  render: () => h(App),
});

app.mount("#app");
