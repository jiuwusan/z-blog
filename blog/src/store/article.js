
import { articleApi } from "@/api";

const archives = {
    namespaced: true,
    state: () => ({
        page: 1,
        pageSize: 3,
        totalSize: 0,
        datalist: [],
        query: {},
        recruitScrollY: 0
    }),
    mutations: {
        update(state, payload = {}) {
            for (const key in payload) {
                state[key] = payload[key];
            }
        }
    },
    actions: {
        async pageQuery({ commit, state = {} }) {
            let { page = 1, pageSize = 10, totalSize = 0, datalist = [], query = {} } = state;
            if (page === 1) {
                datalist.splice(0, datalist.length);
            }
            if (page > 1 && totalSize <= datalist.length) {
                //数据已经全部加载
                return;
            }
            let result = await articleApi.pageQuery({ page, pageSize, ...query });
            Array.prototype.push.apply(datalist, result?.datalist || []);
            totalSize = result?.totalSize;
            page = result?.page + 1;
            pageSize = result?.pageSize;
            commit('update', { page, pageSize, totalSize, datalist })
        },
        async setQuery({ state, commit, dispatch }, newQuery = {}) {
            let { query = {} } = state;
            let flag = true;
            for (const key in newQuery) {
                if (query[key] !== newQuery[key]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return;
            }
            commit('update', { page: 1, totalSize: 0, query: newQuery, datalist: [] });
            dispatch("pageQuery", {});
        }
    },
}

export default archives;