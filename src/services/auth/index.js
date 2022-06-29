import ApiRequest from '@/services/ApiRequest';

export async function login(params, options) {
  return ApiRequest('/auth/emp/oauth/token', {
    method: 'POST',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getUserPage(params, options) {
  return ApiRequest('/api/userPage', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
