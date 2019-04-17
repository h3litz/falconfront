import { queryAssets, bulkDeleteAssets, bulkUpdateAssets, queryAsset, addAsset, updateAsset, deleteAsset } from '@/services/api';

export default {
  namespace: 'asset',
  state: {
    cdndomain: {
      results: [],
      count:0,
    },
    originDomain: {
      results: [],
      count:0,
    },
    domain: 
    {
      results: [],
      count:0,
    },
    ip:{
      results: [],
      count:0,
    },
    port: {
      results: [],
      count:0,
    },
    web: {
      results: [],
      count:0,
    },
  },

  effects: {
    *fetchDomain({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'saveDomain',
        payload: response,
      });
    },
    *submitDomain({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetDomain',
      });
    },
    *bulkOperateDomain({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetDomain',
      });
    },
    *fetchOriginDomain({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'saveOriginDomain',
        payload: response,
      });
    },
    *submitOriginDomain({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetOriginDomain',
      });
    },
    *bulkOperateOriginDomain({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetOriginDomain',
      });
    },
    *fetchIP({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'saveIP',
        payload: response,
      });
    },
    *submitIP({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetIP',
      });
    },
    *bulkOperateIP({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetIP',
      });
    },
    *fetchPort({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'savePort',
        payload: response,
      });
    },
    *submitPort({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetPort',
      });
    },
    *bulkOperatePort({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetPort',
      });
    },
    *fetchWeb({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'saveWeb',
        payload: response,
      });
    },
    *submitWeb({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetWeb',
      });
    },
    *bulkOperateWeb({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetWeb',
      });
    },
    *fetchCdn({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({
        type: 'saveCdn',
        payload: response,
      });
    },
    *submitCdn({ payload }, { call, put }) {
      let callback;
      if (payload.id){
        callback = Object.keys(payload).length === 2 ? deleteAsset : updateAsset;
      } else {
        callback = addAsset;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'resetCdn',
      });
    },
    *bulkOperateCdn({ payload }, { call, put }) {
      const callback = Object.keys(payload).length === 2 ? bulkDeleteAssets : bulkUpdateAssets;
      yield call(callback, payload); // post
      yield put({
        type: 'resetCdn',
      });
    },
  },

  reducers: {
    saveDomain(state,  {payload}) {
      return {
        ...state,
        domain: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetDomain(state){
      return {
        ...state,
        domain:{
          results: [],
          count: 0
        }
      };
    },
    saveOriginDomain(state,  {payload}) {
      return {
        ...state,
        originDomain: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetOriginDomain(state){
      return {
        ...state,
        originDomain:{
          results: [],
          count: 0
        }
      };
    },
    saveIP(state,  {payload}) {
      return {
        ...state,
        ip: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetIP(state){
      return {
        ...state,
        ip:{
          results: [],
          count: 0
        }
      };
    },
    savePort(state,  {payload}) {
      return {
        ...state,
        port: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetPort(state){
      return {
        ...state,
        port:{
          results: [],
          count: 0
        }
      };
    },
    saveWeb(state,  {payload}) {
      return {
        ...state,
        web: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetWeb(state){
      return {
        ...state,
        web:{
          results: [],
          count: 0
        }
      };
    },
    saveCdn(state,  {payload}) {
      return {
        ...state,
        cdndomain: 
        {
          results: payload.results,
          count: payload.count
        } 
      };
    },
    resetCdn(state){
      return {
        ...state,
        cdndomain:{
          results: [],
          count: 0
        }
      };
    },
  },
};
