import router from "./router";
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { storeToRefs } from "pinia";
import { useUserStore } from "./store/useUserStore";
import { ElMessage } from "element-plus"; 

//路由前置守卫
router.beforeEach( async (to: any, from, next) => {
    const { TOKEN, userInfo} = storeToRefs(useUserStore())
    const { getUserInfo, deleUser } = useUserStore()
    // console.log(TOKEN.value)
    nProgress.start()
    if(!TOKEN.value) {
        if(to.name === 'login') {
            next()
        } else {
            next({name: 'login'})
        }
    } else {
        if(to.name === 'login') {
            next('/')
        } else {
            if(!userInfo.value.name) {
                try {
                    await getUserInfo()
                    next()
                } catch(error) {
                    deleUser()
                    next({name: 'login', query: {rediect: to.path}})
                    ElMessage({
                        type: 'error',
                        message: 'TOKEN错误'
                    })
                }
            } else {
                next()
            }
        }
    }
})

//路由后置守卫
router.afterEach((to: any, from) => {
    nProgress.done()
})