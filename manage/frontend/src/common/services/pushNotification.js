import {stringify} from 'qs'
import {apiRequestWithToken} from './requestUtil'
import {getAuthData} from '../utils/auth'
import {getApiUrl} from './base'

const baseUrl = '/push-notification'

export async function list(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}?${stringify(params)}`, 'GET', token)
}

export async function get(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/${params.id}`, 'GET', token)
}

export async function create(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/create`, 'POST', token, JSON.stringify(params))
}

export async function update(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/update`, 'POST', token, JSON.stringify(params))
}

export async function deleteOne(id) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/delete?id=${id}`, 'POST', token)
}
