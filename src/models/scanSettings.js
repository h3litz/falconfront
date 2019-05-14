import { queryConfigs, bulkDeleteConfigs, bulkUpdateConfigs, addConfig, updateConfig, deleteConfig } from '@/services/api';

export default {
  namespace: 'scansettings',
  state: {
    awvs: {
      results: [],
      count:0,
    },
  },

  effects: {
    *fetchAwvs({ payload }, { call, put }) {
      const response = yield call(queryConfigs, payload);
      yield put({
        type: 'saveAwvs',
        payload: response,
      });
    },
    *submitAwvs({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteConfig : updateConfig;
      } else {
        callback = addConfig;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetAwvs',
      });
    },
    *bulkOperateAwvs({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteConfigs : bulkUpdateConfigs;
      yield call(callback, payload); // post
      yield put({
        type: 'resetAwvs',
      });
    },
  },

  reducers: {
    saveAwvs(state,  {payload}) {
      return {
        ...state,
        awvs: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetAwvs(state){
      return {
        ...state,
        awvs:{
          results: [],
          count: 0
        }
      };
    },
  },
};
