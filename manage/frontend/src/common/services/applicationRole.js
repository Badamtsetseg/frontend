import {getApiUrl} from './base'
import {apiRequestWithToken} from './requestUtil'
import {getAuthData} from '../utils/auth'

export default async function list() {
  const token = getAuthData() != null ? getAuthData().token : null
  return apiRequestWithToken(`${getApiUrl()}/application-role`, 'GET', token)
}
