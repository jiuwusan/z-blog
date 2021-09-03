import { createStore } from 'vuex'
import profile from './profile'
import archives from './archives'
import article from './article'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    profile,
    archives,
    article
  }
})
