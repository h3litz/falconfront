import { queryOutbands, bulkDeleteOutbands, addOutband, deleteOutband, } from '@/services/outbandapi';

export default {
    namespace: 'outband',
    state: {
        xss: {
            results: [],
            count: 0,
        },
        dns: {
            results: [],
            count: 0,
        },
        http: {
            results: [],
            count: 0,
        },
    },

    effects: {
        *fetchXss({ payload }, { call, put }) {
            const response = yield call(queryOutbands, payload);
            yield put({
                type: 'saveXss',
                payload: response,
            });
        },
        *submitXss({ payload }, { call, put }) {
            let callback;
            if (payload.id) {
                callback = deleteOutband;
            } else {
                callback = addOutband;
            }
            yield call(callback, payload); // post
            yield put({
                type: 'resetXss',
            });
        },
        *bulkOperateXss({ payload }, { call, put }) {
            const callback = bulkDeleteOutbands;
            yield call(callback, payload); // post
            yield put({
                type: 'resetXss',
            });
        },
        *fetchDns({ payload }, { call, put }) {
            const response = yield call(queryOutbands, payload);
            yield put({
                type: 'saveDns',
                payload: response,
            });
        },
        *submitDns({ payload }, { call, put }) {
            let callback;
            if (payload.id) {
                callback = deleteOutband;
            } else {
                callback = addOutband;
            }
            yield call(callback, payload); // post
            yield put({
                type: 'resetDns',
            });
        },
        *bulkOperateDns({ payload }, { call, put }) {
            const callback = bulkDeleteOutbands;
            yield call(callback, payload); // post
            yield put({
                type: 'resetDns',
            });
        },
        *fetchHttp({ payload }, { call, put }) {
            const response = yield call(queryOutbands, payload);
            yield put({
                type: 'saveHttp',
                payload: response,
            });
        },
        *submitHttp({ payload }, { call, put }) {
            let callback;
            if (payload.id) {
                callback = deleteOutband;
            } else {
                callback = addOutband;
            }
            yield call(callback, payload); // post
            yield put({
                type: 'resetHttp',
            });
        },
        *bulkOperateHttp({ payload }, { call, put }) {
            const callback = bulkDeleteOutbands;
            yield call(callback, payload); // post
            yield put({
                type: 'resetHttp',
            });
        },
    },

    reducers: {
        saveXss(state, { payload }) {
            return {
                ...state,
                xss:
                {
                    results: payload.results,
                    count: payload.count
                }
            };
        },
        resetXss(state) {
            return {
                ...state,
                xss: {
                    results: [],
                    count: 0
                }
            };
        },
        saveDns(state, { payload }) {
            return {
                ...state,
                dns:
                {
                    results: payload.results,
                    count: payload.count
                }
            };
        },
        resetDns(state) {
            return {
                ...state,
                dns: {
                    results: [],
                    count: 0
                }
            };
        },
        saveHttp(state, { payload }) {
            return {
                ...state,
                http:
                {
                    results: payload.results,
                    count: payload.count
                }
            };
        },
        resetHttp(state) {
            return {
                ...state,
                http: {
                    results: [],
                    count: 0
                }
            };
        },
    },
};
