import ElementPlus from "element-plus";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./assets/css/style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
