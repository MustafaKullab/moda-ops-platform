import { createApp } from "vue";
import { createPinia } from "pinia";

import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("Toaster-Library", Toaster);
app.use(Antd);

app.mount("#app");
