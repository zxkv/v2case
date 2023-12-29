import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import ElementUI from "element-ui";
import App from "./App.vue";
import "./assets/css/app.css";
import "element-ui/lib/theme-chalk/index.css";

import "./store";
import "./permission";

Vue.use(VueRouter);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
