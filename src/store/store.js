import { createStore } from 'vuex';
import axios from '../axios-auth'
const store = createStore({
    state() {
        return {
            jwt: null,
            username: null,
            userType: null
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.jwt != null;
        },     
        isAdmin(state) {
            return state.userType == 1;
        }
    },
    mutations: {
        loginSuccesful(state, parameters) {
            state.jwt = parameters.jwt;
            state.username = parameters.username;
            state.userType = parameters.userType;
        },
        logout(state) {
            state.jwt = null;
            state.username = null;
        }
    },
    actions: {
        autoLogin({ commit }) {
            let jwt = localStorage.getItem('jwt');
            let username = localStorage.getItem('username');
            let userType = localStorage.getItem('userType');

            if(jwt) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
                commit('loginSuccesful', {
                    jwt: jwt,
                    username: username,
                    userType: userType
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
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('userType', res.data.userType);

                        commit('loginSuccesful', {
                            jwt: res.data.jwt,
                            username: res.data.username,
                            userType: res.data.userType
                        });
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
        }
    }
});
export default store;