import {getApiUrl} from './base'
import {jsonRequest} from './util'

export async function getDemo(token) {
  return await jsonRequest(getApiUrl() + '/dashboard/demo', 'GET', token)
}
