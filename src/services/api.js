import { stringify } from 'qs';
import request from '@/utils/request';
import cookie from 'react-cookies';

const headers =  {
  "X-CSRFToken": cookie.load('csrftoken'),
  "Authorization": `Token ${localStorage.getItem('Token')}`
    }

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getDashboardData() {
  return request(`/api/dashboard`,
  {headers: {
  "X-CSRFToken": cookie.load('csrftoken'),
  "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}

export async function queryAssets(params) {
  const { method, search = '', originDomain = '', domain = '', ip = '',port = '', status = '', severity = '', company = '', domainid = '', currentPage = '', pageSize = ''} = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  let callback;
  const currentRealPage = currentPage === '' ? '' :currentPage - 1;
  switch (method) {
    case 'web':
      if (search||originDomain||domain||ip||domainid||currentPage||pageSize){
        callback = `/api/info/web?search=${search}&origin_domain__name=${originDomain}&domain__name=${domain}&ip__ip=${ip}&domain=${domainid}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else{
        callback = `/api/info/web`
      };
      break;
    case 'port':
      if (search || port || ip || currentPage || pageSize){
        callback = `/api/info/port?search=${search}&port=${port}&ip__ip=${ip}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else {
        callback = `/api/info/port`;
      };
      break;
    case 'ip':
      if (search || originDomain || status || currentPage || pageSize){
        callback = `/api/info/ip?search=${search}&origin_domain=${originDomain}&status=${status}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else {
        callback = `/api/info/ip`;
      };
      break;
    case 'cdn':
      if (search || originDomain || currentPage || pageSize){
        callback = `/api/info/cdn?search=${search}&origin_domain=${originDomain}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else {
        callback = `/api/info/cdn`;
      };
      break;
    case 'domain':
      if (search || originDomain || status || currentPage || pageSize){
        callback = `/api/info/domain?search=${search}&origin_domain=${originDomain}&status=${status}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else {
        callback = `/api/info/domain`;
      };
      break;
    case 'originDomain':
      if (search || company || status || currentPage || pageSize){
        callback = `/api/info/origin_domain?search=${search}&company=${company}&status=${status}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else {
        callback = `/api/info/origin_domain`;
      };
      break;
    case 'vuln':
      if (search || originDomain || severity|| status || currentPage || pageSize){
        callback = `/api/risk/vuln?search=${search}&origin_domain=${originDomain}&severity=${severity}&status=${status}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else {
        callback = `/api/risk/vuln`;
      };
      break;
    default:
      alert(`method no ${method} provide!`);
      return '';
  };
  return request(callback,{headers,});
}

export async function bulkDeleteAssets(params) {
  const { method } = params;
  let callback;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  if ( method === 'vuln' ) {
    callback = `/api/risk/${method}/delete`;
  }else {
    callback = `/api/info/${method}/delete`;
  }
  return request(callback, {
    method: 'POST',
    body: {
      ...params,
    },
    headers,
  });
}

export async function bulkUpdateAssets(params) {
  const { method } = params;
  let callback;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  if ( method === 'vuln' ) {
    callback = `/api/risk/${method}/update`;
  }else {
    callback = `/api/info/${method}/update`;
  }
  return request(callback, {
    method: 'POST',
    body: {
      ...params,
    },
    headers,
  });
}

export async function queryAsset(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/info/${method}/${params.id}`, {
    method: 'GET',
    headers,
  });
}

export async function addAsset(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/info/${method}`, {
    method: 'POST',
    body: {
      ...params,
    },
    headers,
  });
}

export async function updateAsset(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/info/${method}/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
    headers,
  });
}

export async function deleteAsset(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/info/${method}/${params.id}`, {
    method: 'DELETE',
    headers,
  });
}

export async function queryConfigs(params) {
  const { method, search = '', status = '' , currentPage = '', pageSize = ''} = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  let callback;
  const currentRealPage = currentPage === '' ? '' :currentPage - 1;
  switch (method) {
    case 'awvs':
      if (search||status||currentPage||pageSize){
        callback = `/api/config/awvs?search=${search}&status=${status}&limit=${pageSize}&offset=${currentRealPage}0`;
      }else{
        callback = `/api/config/awvs`
      };
      break;
    default:
      alert(`method no ${method} provide!`);
      return '';
  };
  return request(callback,{headers});
}

export async function bulkDeleteConfigs(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/config/${method}/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
    headers: {
      "X-CSRFToken": cookie.load('csrftoken'),
      "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}

export async function bulkUpdateConfigs(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/config/${method}/update`, {
    method: 'POST',
    body: {
      ...params,
    },
    headers: {
      "X-CSRFToken": cookie.load('csrftoken'),
      "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}

export async function queryConfig(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/config/${method}/${params.id}`, {
    method: 'GET',
    headers: {
      "X-CSRFToken": cookie.load('csrftoken'),
      "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}

export async function addConfig(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/config/${method}`, {
    method: 'POST',
    body: {
      ...params,
    },
    headers: {
      "X-CSRFToken": cookie.load('csrftoken'),
      "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}

export async function updateConfig(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/config/${method}/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
    },
    headers: {
      "X-CSRFToken": cookie.load('csrftoken'),
      "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}

export async function deleteConfig(params) {
  const { method } = params;
  if (typeof(params) === "undefined" && typeof(method) === "undefined") {
    alert('params error or method no provide!');
    return '';
  };
  return request(`/api/config/${method}/${params.id}`, {
    method: 'DELETE',
    headers: {
      "X-CSRFToken": cookie.load('csrftoken'),
      "Authorization": `Token ${localStorage.getItem('Token')}`
    },
  });
}
