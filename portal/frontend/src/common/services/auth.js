import {getApiUrl} from './base'
import {jsonRequest} from './util'

export async function login(username, password) {
  return jsonRequest(getApiUrl() + '/auth/login', 'POST', null, JSON.stringify({username, password}))
}
