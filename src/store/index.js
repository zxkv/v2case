import Vue from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

// 数据持久化
pinia.use(piniaPluginPersistedstate);

Vue.use(pinia);

export default pinia;
