import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import API from "./api/API";
import { BootstrapVue, IconsPlugin, ModalPlugin  } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ModalPlugin)


axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


// Add a 401 response interceptor
axios.interceptors.response.use((response)=>{ 
  return response.data; 
},
(error) => {
  if(401 === error.response.status && window.location.pathname.indexOf('login') === -1)
  {
    store.dispatch('auth/signOut')
  }
  return Promise.reject(error.response.data);
});

Vue.prototype.$http = axios;
Vue.prototype.API = API;
Vue.prototype.store = store;
Vue.config.productionTip = false;

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if(mutation.payload)
      {
        axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
        localStorage.setItem('token', mutation.payload);
      }
      else
      {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('token');
      }
      break;
    case 'auth/SET_USER':
      break;
    default:
      break;
  }
});

store.dispatch('auth/attempt', localStorage.getItem('token') ).then(()=> {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}); 



