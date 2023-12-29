import router, { resetRouter } from "@/router";
import { useUserStore } from "@/store/user";

const store = useUserStore();

let isLogin = false;
router.beforeEach((to, from, next) => {
	console.log("store", store);
	isLogin = store.role !== null;

	if (to.path === "/login") {
		isLogin ? next({ name: "Home", path: "" }) : next();
	} else {
		isLogin ? next() : next({ name: "Login", path: "/login" });
	}
});

router.afterEach(() => {});
