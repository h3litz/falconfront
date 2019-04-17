import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser',{
    method: 'get',
    headers: {
      "Authorization": "Token " + localStorage.getItem('Token')
    },
  });
  
}
