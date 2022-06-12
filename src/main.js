import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store';

import Home from './components/Home.vue';
import ProductList from './components/products/ProductList.vue';
import CreateProduct from './components/products/CreateProduct.vue';
import EditProduct from './components/products/EditProduct.vue';
import OrderList from './components/orders/orderList.vue';
import Login from './components/Login.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/products', component: ProductList },
    { path: '/createproduct', component: CreateProduct },
    { path: '/orders', component: OrderList },
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