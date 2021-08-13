
import { configApi } from "@/api";

const uidMap = {
    general: "fb57a600-eace-11eb-96b5-e73f4408ddb9",
    footer: "fb57a600-eace-11eb-96b5-e73f4408ddb6",
    index: "fb57a600-eace-11eb-96b5-e73f4408ddb5",
    link: "fb57a600-eace-11eb-96b5-e73f4408ddb7",
}

const profile = {
    namespaced: true,
    state: () => ({
        general: {
            name: "Blog"
        }
    }),
    mutations: {
        update(state, payload) {
            state[payload.name] = payload.data || {};
        }
    },
    actions: {
        init({ dispatch }) {
            console.log("##profile##");
            for (const name in uidMap) {
                dispatch("getConfig", { name });
            }
        },
        async getConfig({ commit }, payload) {
            let { name } = payload;
            let result = await configApi.findById({
                uid: uidMap[name]
            });
            result.profile && (result.profile = JSON.parse(result.profile));
            commit('update', { name, data: result?.profile || {} })
        }
    },
}

export default profile;