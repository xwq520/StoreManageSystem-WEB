import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import {com} from './components/common/Contants';

Vue.use(ElementUI, { size: 'small' });

// axios defualt settings
// 现在，在超时前，所有请求都会等待 1分钟
axios.defaults.timeout = 60000;
// axios.defaults.baseURL = 'http://127.0.0.1:8080';
// axios.defaults.headers.common['Authorization'] = 'https://api.example.com';

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role.indexOf(com.roleKey) >=0 ? next() : next('/403');
        //console.log('adminTestToken');
       // axios.defaults.headers = [{'Authorization':'adminTestToken'},{'workCode':'adminWorkCode'}];
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            //axios.defaults.headers = [{'Authorization':'testToken'},{'workCode':'workCode'}];
           // console.log('TestToken');
            next();
        }
    }
})
Vue.prototype.$axios = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}
