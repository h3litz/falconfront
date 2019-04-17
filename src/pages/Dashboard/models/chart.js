import { getDashboardData } from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    // visitData: [],
    // visitData2: [],
    // salesData: [],
    // searchData: [],
    // offlineData: [],
    // offlineChartData: [],
    // salesTypeData: [],
    // salesTypeDataOnline: [],
    // salesTypeDataOffline: [],
    // radarData: [],
    loading: false,
    domainCount: 0,
    domainTodayCount: 0,
    ipCount: 0,
    ipTodayCount: 0,
    webCount: 0,
    webTodayCount: 0,
    portCount: 0,
    portTodayCount: 0,
    vulnCount: 0,
    vulnValidCount: 0,
    vulnValidRate: 0,
    vulnDateCount: [],
    vulnCateCount: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getDashboardData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        domainCount: 0,
        domainTodayCount: 0,
        ipCount: 0,
        ipTodayCount: 0,
        webCount: 0,
        webTodayCount: 0,
        portCount: 0,
        portTodayCount: 0,
        vulnCount: 0,
        vulnValidCount: 0,
        vulnValidRate: 0,
        vulnDateCount: [],
        vulnCateCount: [],
      };
    },
  },
};
