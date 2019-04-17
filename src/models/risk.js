import {  queryAssets, bulkDeleteAssets, bulkUpdateAssets, queryAsset, addAsset, updateAsset, deleteAsset
        } from '@/services/api';

export default {
  namespace: 'risk',
  state: {
    vuln: {
      results: [],
      count:0,
    },
  },

  effects: {
    *fetchVuln({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'saveVuln',
        payload: response,
      });
    },
    *submitVuln({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetVuln',
      });
    },
    *bulkOperateVuln({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetVuln',
      });
    },
  },

  reducers: {
    saveVuln(state,  {payload}) {
      return {
        ...state,
        vuln: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetVuln(state){
      return {
        ...state,
        vuln:{
          results: [],
          count: 0
        }
      };
    },
  },
};
