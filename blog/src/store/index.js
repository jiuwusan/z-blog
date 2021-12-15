import { createStore } from 'vuex'
import profile from './profile'
import archives from './archives'
import article from './article'
import menu from './menu'
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
    article,
    menu
  }
})
