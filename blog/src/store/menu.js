import { routes } from '@/router'
const profile = {
    namespaced: true,
    state: () => ({
        list: routes.filter((item) => { return item.visible })
    }),
    mutations: {
        update(state, payload) {
            state[payload.name] = payload.data || {};
        }
    },
    actions: {},
}

export default profile;