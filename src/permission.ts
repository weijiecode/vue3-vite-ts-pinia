import { start, close } from '@/utils/nprogress';
import router from '@/router'

router.beforeEach((to, from, next) => {
    console.log('@')
    start();
    next();
})

router.afterEach(() => {
    console.log('#')
    close()
})