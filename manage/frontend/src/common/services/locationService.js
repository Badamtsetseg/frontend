import {stringify} from 'qs'
import {apiRequestWithToken} from './requestUtil'
import {getAuthData} from '../utils/auth'
import {getApiUrl} from './base'

export async function list(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}/location?${stringify(params)}`, 'GET', token)
}

export async function getFullName(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}/location/get-full-name?${stringify(params)}`, 'GET', token)
}