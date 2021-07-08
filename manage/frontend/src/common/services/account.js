import {getApiUrl} from './base'
import {apiRequestWithToken} from './requestUtil'
import {getAuthData} from '../utils/auth'

const baseUrl = '/account'

export async function changePassword(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/change-password`, 'POST', token, JSON.stringify(params))
}

export async function getProfile() {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/profile`, 'GET', token)
}

export async function updateProfile(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/profile`, 'POST', token, JSON.stringify(params))
}
