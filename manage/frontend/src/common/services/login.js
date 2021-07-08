import {stringify} from 'qs'
import {getApiUrl} from './base'
import {apiRequest} from './requestUtil'

const baseUrl = '/auth'

export async function login(username, password) {
  return apiRequest(`${getApiUrl()}${baseUrl}/login`, 'POST', JSON.stringify({username, password}))
}

export async function checkToken(token) {
  return apiRequest(`${getApiUrl()}${baseUrl}/check-token?token=${token}`, 'GET')
}

export async function resetPassword(username) {
  return apiRequest(`${getApiUrl()}${baseUrl}/reset-password`, 'POST', stringify({username}))
}

export async function checkPasswordResetToken(payload) {
  return apiRequest(`${getApiUrl()}${baseUrl}/check-password-reset-token`, 'POST', stringify(payload))
}

export async function setPassword(payload) {
  return apiRequest(`${getApiUrl()}${baseUrl}/set-password`, 'POST', stringify(payload))
}
