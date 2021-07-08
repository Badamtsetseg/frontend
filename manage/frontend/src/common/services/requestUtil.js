import {getLocale} from './base'

function processResponse(promise) {
  return promise
    .then((response) => {
      switch (response.status) {
        case 200:
          return response.text()
            .then(text => {
              try {
                return {result: true, data: JSON.parse(text)}
              } catch(e) {
                return {result: true, data: text}
              }
            })
        case 401:
          return response.text()
            .then(text => ({result: false, message: text, doLogout: true}))
        default:
          return response.text()
            .then(body => ({result: false, message: body}))
      }
    })
    .catch((e) => ({result: false, message: e.message}))
}

function buildFetch(url, method, headers, body) {
  const requestOptions = Object.assign(
    {},
    {headers},
    {
      method,
      body,
    },
  )
  return fetch(url, requestOptions)
}

export async function apiRequest(url, method, body) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept-Language': getLocale(),
  })

  return processResponse(buildFetch(url, method, headers, body))
}

export async function apiRequestWithToken(url, method, token, body) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept-Language': getLocale(),
    'X-Auth-Token': token,
  })

  return processResponse(buildFetch(url, method, headers, body))
}
