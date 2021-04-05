import {getApiUrl} from './base'
import {jsonRequest} from './util'

export async function listDemo() {
  return jsonRequest(getApiUrl() + '/service/demo', 'GET')
}
