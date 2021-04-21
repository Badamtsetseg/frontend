import {stringify} from 'qs'

import {apiRequest} from '../../util'
import {getSharedApiUrl} from '../base'

const baseUrl = '/reference-data'

export async function getList(params) {
  return apiRequest(getSharedApiUrl() + `${baseUrl}?${stringify(params)}`, 'GET')
}

export async function getById(id) {
  return apiRequest(getSharedApiUrl() + `${baseUrl}/${id}`, 'GET')
}

export async function select(params) {
  return apiRequest(getSharedApiUrl() + `${baseUrl}/select?${stringify(params)}`, 'GET')
}
