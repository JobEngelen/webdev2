import { createStore } from 'vuex';
import axios from '../axios-auth'
const store = createStore({
    state() {
        return {
            jwt: null,
            uid: null,
            username: 1,
            userType: null,
            cart: null
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
        }
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
            state.cart = parameter.cart;
        },
        clearShoppingCart(state) {
            state.cart = null;
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
            commit('shoppingCart', {
                cart: cart
            })
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
            return new Promise((resolve, reject) => {
                axios
                    .get("/products/" + parameter.id)
                    .then((res) => {
                        let cart = localStorage.getItem('cart');

                        var cartString = "";

                        if (cart != null) {
                            var cartArray = cart.split(',,');
                            cartArray.push(res.data.id);
                            cartArray.forEach((value, index) => {
                                if (index == 0) cartString = value;
                                else cartString += ",," + value;
                            })
                        } else {
                            cartString = res.data.id;
                        }
                        localStorage.setItem('cart', cartString);

                        commit('shoppingCart', {
                            cart: cartString,
                        });
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            })
        },
        removeItemFromCart({ commit }, parameter) {
            let cart = localStorage.getItem('cart');

            var cartString = "";
            var removed = false;

            var cartArray = cart.split(',,');
            cartArray.forEach((value, index) => {
                console.log(value + " en " + parameter.id);
                if (!removed && value == parameter.id) removed = true;
                else {
                    if (index == 0) cartString = value;
                    else cartString += ",," + value;
                }
            })

            localStorage.setItem('cart', cartString);

            commit('shoppingCart', {
                cart: cartString,
            });
        },
        clearItemFromCart({ commit }, parameter) {
            let cart = localStorage.getItem('cart');

            var cartString = "";

            var cartArray = cart.split(',,');
            cartArray.forEach((value, index) => {
                console.log(value + " en " + parameter.id);
                if (value != parameter.id)
                {
                    if (index == 0) cartString = value;
                    else cartString += ",," + value;
                }
            })

            localStorage.setItem('cart', cartString);

            commit('shoppingCart', {
                cart: cartString,
            });
        },
        clearShoppingCart({ commit }) {
            localStorage.removeItem('cart');
            commit('clearShoppingCart');
        },
        order() {
            console.log("cart= " + localStorage.getItem('cart'));
            console.log("uid= " + localStorage.getItem('uid'));
            return new Promise((resolve, reject) => {
                axios
                    .post("/order", {
                        orderstring: localStorage.getItem('cart'),
                        userid: localStorage.getItem('uid'),
                    })
                    .then(res => {
                        alert(res.data);
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
        },
    }
});
export default store;