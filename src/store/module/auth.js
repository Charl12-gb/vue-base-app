import axios from 'axios'
import { BASE_URL } from '../../services/api'
import axiosWithHeaders from '../../services/api'
import router from '../../router'

const state = {
    accessToken: null,
    refreshToken: null,
    currentUser: null,
}

const dataLogout = {
    refresh_token: localStorage.getItem('refresh_token')
  }

const getters = {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
    getCurrentUser: state => state.currentUser,
}

const mutations = {
    setTokens(state, { access, refresh }) {
        state.accessToken = access;
        state.refreshToken = refresh;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', true);
      },
    
      removeTokens(state) {
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      },
    
      setCurrentUser(state, user) {
        state.currentUser = user
      },
}

const actions = {
    login({ commit }, loginData) {
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/login`, loginData)
               .then(response => {
                    commit('setTokens', response.data);
                    commit('setCurrentUser', response.data.user);
                    resolve(response.data);
                })
               .catch(err => {
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            axiosWithHeaders.post('logout', dataLogout)
                .then((response) => {
                    commit('setTokens', response.data);
                    commit('setCurrentUser', response.data.user);
                    resolve(response.data);
                    router.push('/login')
                })
                .catch((error) => {
                    commit('setTokens', {});
                    commit('setCurrentUser', null);
                    router.push('/login')
                    reject(error)
                })
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}