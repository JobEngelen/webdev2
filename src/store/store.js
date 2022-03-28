import { createStore } from 'vuex';
import axios from '../axios-auth'
const store = createStore({
    state() {
        return {
            token: null
        }
    },
    getters: {
    },
    mutations: {
        loginSuccesful(state, parameters) {
            state.token = parameters.token;
        }
    },
    actions: {
        login({commit}, parameters) {
            return new Promise((resolve, reject) => {
                axios
                .post("/users/login", {
                    username: parameters.username,
                    password: parameters.password
                })
                .then(res => {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
                    console.log(res.data.token);

                    localStorage.setItem('token', res.data.token);

                    commit('loginSuccesful', {
                        token: res.data.token
                    });
                    resolve();
                    //   this.$router.push('/products')
                })
                .catch((error) => reject(error));
            })            
            }
        }
    });
export default store;