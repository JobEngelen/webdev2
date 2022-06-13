import { createStore } from 'vuex';
import axios from '../axios-auth'
const store = createStore({
    state() {
        return {
            jwt: null,
            uid: null,
            username: 1,
            userType: null,
            cart: []
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.jwt != null;
        },
        isAdmin(state) {
            return state.userType == 1;
        },
        cartNotEmpty(state) {
            return state.cart != null;
        },
        getCartItems() {
            var cart = localStorage.getItem('cart');
            if (typeof cart !== "undefined" && cart !== null && cart != "") {
                var products = [];
                JSON.parse(cart).forEach(product => {
                    products.push(product);
                })
                return products;
            }
        },
    },
    mutations: {
        loginSuccesful(state, parameters) {
            state.jwt = parameters.jwt;
            state.uid = parameters.uid;
            state.username = parameters.username;
            state.userType = parameters.userType;
        },
        logout(state) {
            state.jwt = null;
            state.uid = 1;
            state.username = null;
        },
        shoppingCart(state, parameter) {
            var inArray = false;
            if (typeof state.cart !== "undefined" && state.cart !== null && state.cart != "") {
                state.cart.forEach(product => {
                    if (parameter.cart.id == product.id) {
                        state.cart[state.cart.indexOf(product)].quantity++;
                        inArray = true;
                    }
                })
            }
            if (!inArray) state.cart.push(parameter.cart);
            localStorage.setItem('cart', JSON.stringify(this.state.cart));
        },
        retractFromCart(state, parameter) {
            state.cart[state.cart.indexOf(parameter.cart)].quantity--;
        },
        clearItemFromCart(state, parameter) {
            state.cart.splice(state.cart.indexOf(parameter.cart), 1);
            console.log(state.cart);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearShoppingCart(state) {
            state.cart.forEach(product => {
                product.quantity = 1;
            });
            localStorage.removeItem('cart');
            state.cart = [];
        }
    },
    actions: {
        autoLogin({ commit }) {
            let jwt = localStorage.getItem('jwt');
            let uid = localStorage.getItem('id');
            let username = localStorage.getItem('username');
            let userType = localStorage.getItem('userType');
            let cart = localStorage.getItem('cart');


            if (jwt) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
                commit('loginSuccesful', {
                    jwt: jwt,
                    uid: uid,
                    username: username,
                    userType: userType
                });
            }
            if (typeof cart !== "undefined" && cart !== null && cart != "") {
                JSON.parse(cart).forEach(product => {
                    commit('shoppingCart', {
                        cart: product
                    })
                });
            }
        },
        logout({ commit }) {
            localStorage.clear();
            commit('logout');
        },
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/users/login", {
                        username: parameters.username,
                        password: parameters.password
                    })
                    .then(res => {
                        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.jwt;
                        console.log(res.data.jwt);

                        localStorage.setItem('jwt', res.data.jwt);
                        localStorage.setItem('uid', res.data.id);
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('userType', res.data.userType);

                        commit('loginSuccesful', {
                            jwt: res.data.jwt,
                            uid: res.data.id,
                            username: res.data.username,
                            userType: res.data.userType
                        });
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
        },
        addItemToCart({ commit }, parameter) {
            commit('shoppingCart', {
                cart: parameter,
            });
        },
        retractItemFromCart({ commit }, product) {
            commit('retractFromCart', {
                cart: product,
            });
            if (product.quantity == 0) {
                commit('clearItemFromCart', {
                    cart: product
                })
            }
        },
        clearItemFromCart({ commit }, parameter) {
            commit('clearItemFromCart', {
                cart: parameter
            })
        },
        clearShoppingCart({ commit }) {
            commit('clearShoppingCart');
        },
        order({ commit }) {
            var uid = 1;
            if (localStorage.getItem('uid') != null) uid = localStorage.getItem('uid');
            var cart = localStorage.getItem('cart');
            return new Promise((resolve, reject) => {
                axios
                    .post("/order", {
                        orderstring: JSON.parse(cart),
                        userid: uid,
                    })
                    .then(res => {
                        console.log(res);
                        alert(res.data);

                        localStorage.removeItem('cart');
                        commit('clearShoppingCart');
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
        },
    }
});
export default store;