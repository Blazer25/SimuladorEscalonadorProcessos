import { createApp } from "vue";
import router from "./router";

import "./assets/styles/reset.scss";
import "./assets/styles/global.scss";

import common from "./common";

import App from "./App.vue";

createApp(App).use(common).use(router).mount("#app");
