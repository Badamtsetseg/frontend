import {stringify} from 'qs'
import {apiRequest} from '../util'
import {getSharedApiUrl} from './base'

export async function getList(params) {
  return apiRequest(`${getSharedApiUrl()}/article?${stringify(params)}`, 'GET')
}

export async function getById(id) {
  return apiRequest(`${getSharedApiUrl()}/article/${id}`, 'GET')
}
