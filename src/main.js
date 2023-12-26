import Vue from "vue";
import router from "./router";
import pinia from "./store";
import ElementUI from "element-ui";
import App from "./App.vue";
import "./assets/css/app.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { size: "small", zIndex: 3000 });

new Vue({
	router,
	pinia,
	render: h => h(App)
}).$mount("#app");
