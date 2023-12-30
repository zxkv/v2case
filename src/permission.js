import router, { resetRouter } from "@/router";
import { useUserStore } from "@/store/user";

const store = useUserStore();

let isLogin = false;
router.beforeEach((to, from, next) => {
	isLogin = store.role !== null;
	if (to.path === "/login") {
		isLogin ? next({ path: "/" }) : next();
	} else {
		isLogin ? next() : next({ path: "/login" });
	}
});

router.afterEach(() => {});
