
import { articleApi, classifyApi, labelApi } from "@/api";

const archives = {
    namespaced: true,
    state: () => ({
        classify: [],
        label: [],
        rank: []
    }),
    mutations: {
        update(state, payload) {
            state[payload.name] = payload.data || {};
        }
    },
    actions: {
        init({ dispatch }) {
            dispatch("classifyQuery", {});
            dispatch("labelQuery", {});
            dispatch("topQuery", {});
        },
        async topQuery({ commit, state }) {
            if (state.rank.length > 0) {
                return;
            }
            let result = (await articleApi.topQuery()) || [];
            commit('update', { name: "rank", data: result })
        },
        async labelQuery({ commit, state }) {
            if (state.label.length > 0) {
                return;
            }
            let result = (await labelApi.query()) || [];
            commit('update', { name: "label", data: result })
        },
        async classifyQuery({ commit, state }) {
            if (state.classify.length > 0) {
                return;
            }
            let result = (await classifyApi.query()) || [];
            result.unshift({
                uid: "99",
                name: "全部文章",
                cover: "",
            });
            commit('update', { name: "classify", data: result })
        }
    },
}

export default archives;