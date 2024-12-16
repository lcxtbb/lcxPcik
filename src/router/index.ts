import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";


const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        // 路由跳转始终滚动到顶部
        return { top: 0 }
    },
})

export default router