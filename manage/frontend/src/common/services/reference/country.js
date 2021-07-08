import {stringify} from 'qs'
import {apiRequestWithToken} from '../requestUtil'
import {getAuthData} from '../../utils/auth'
import {getApiUrl} from '../base'

const baseUrl = '/country'

export async function list(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}?${stringify(params)}`, 'GET', token)
}

export async function select(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/select?${stringify(params)}`, 'GET', token)
}

export async function create(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/create`, 'POST', token, JSON.stringify(params))
}

export async function update(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/update`, 'PUT', token, JSON.stringify(params))
}

export async function deleteOne(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}/delete`, 'DELETE', token, JSON.stringify(params))
}
