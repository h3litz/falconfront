import { queryAsset,queryAssets } from '@/services/api';

export default {
  namespace: 'domainDetail',

  state: {
    name: '',
    status: 0,
    originDomain: '',
    vulnNum: {
      high: 0,
      mid: 0,
      low: 0
    },
    vulnStatus: {
      submited: 0,
      toSubmit: 0,
      ignored: 0
    },
    webs: [],
    ips:[],
    vluns:[],
    created: '',
    modified: '',
    web_scan_time: '',
    plugin_scan_time: ''
  },

  effects: {
    *fetchDomainDetail({ payload }, { call, put }) {
      const response = yield call(queryAsset, payload);
      yield put({
        type: 'saveDomainDetail',
        payload: response,
      });
    },
    *fetchDomainWebs({ payload }, {call, put}) {
      const response = yield call(queryAssets,payload)
      yield put({
        type: 'saveDomainWebs',
        payload: response
      })
    }
  },

  reducers: {
    saveDomainDetail(state, { payload }) {
      return {
        ...state,
        ...payload,
        originDomain: payload.origin_domain,
      };
    },
    saveDomainWebs(state, { payload }) {
      return {
        ...state,
        webs: payload.results
      }
    }
  },
};
