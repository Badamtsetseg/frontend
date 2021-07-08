import {stringify} from 'qs'
import {apiRequestWithToken} from './requestUtil'
import {getAuthData} from '../utils/auth'
import {getApiUrl} from './base'

const baseUrl = '/device-token'

export async function list(params) {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}${baseUrl}?${stringify(params)}`, 'GET', token)
}

export function getImportUrl() {
  return `${getApiUrl()}${baseUrl}/import`
}
