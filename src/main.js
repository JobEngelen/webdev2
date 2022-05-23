import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store';

import Home from './components/Home.vue';
import CartTest from './components/CartTest.vue';
import ProductList from './components/products/ProductList.vue';
import CreateProduct from './components/products/CreateProduct.vue';
import EditProduct from './components/products/EditProduct.vue';
import Login from './components/Login.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/cart-test', component: CartTest },
    { path: '/products', component: ProductList },
    { path: '/createproduct', component: CreateProduct },
    { path: '/login', component: Login },
    { path: '/editproduct/:id', component: EditProduct, props: true  }
];

const router = createRouter({
    "history": createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');