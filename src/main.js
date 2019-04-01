import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store';
import '../static/weui/weui.css'

var Fly = require("flyio/dist/npm/wx")
var fly = new Fly;


// 请求拦截
// fly.interceptors.request.use((request) => {
//     request.body.appId = 'xxx';
//     // 用户的openId在获取之后添加到全局变量中如果存在，我们将它添加到请求参数里面
//     let openId = Vue.prototype.globalData.openId;
//     if (openId) {
//         request.body.openId = openId
//     }
// });
// // 响应拦截
// fly.interceptors.response.use(
//     (response) => {


//     },
//     (err) => {
//         //发生网络错误后会走到这里
//         //return Promise.resolve("ssss")
//         wx.hideLoading();
//         wx.showToast({
//             title: '网络不流畅，请稍后再试！',
//             icon: 'none',
//         });
//     });


// 将fly挂载在Vue的原型上
Vue.prototype.$flyio = fly

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;
const app = new Vue({
    App
})
app.$mount();