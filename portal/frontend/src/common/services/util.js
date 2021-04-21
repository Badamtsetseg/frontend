export function getLocale() {
  return 'mn'
}

function processResponse(promise) {
  return promise
    .then((response) => {
      return response.json().then((json) => json)
    })
    .catch((e) => ({result: false, message: e.message}))
}

function buildFetch(url, method, headers, body) {
  const requestOptions = Object.assign(
    {headers},
    {
      method,
      body,
    },
  )
  return fetch(url, requestOptions)
}

export async function fetchJson(url, method, token, body) {
  return doFetch(url, method, 'application/json', token, body)
}

export async function doFetch(url, method, contentType, token, body) {
  let headerParams = {
    'Content-Type': contentType,
    'Accept-Language': getLocale(),
  }
  if (token) {
    headerParams = Object.assign(headerParams, {
      'X-Auth-Token': token,
    })
  }

  return buildFetch(url, method, new Headers(headerParams), body)
}

export async function apiRequest(url, method, body) {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded', // application/json
    'Accept-Language': getLocale(),
  })

  return processResponse(buildFetch(url, method, headers, body))
}

export async function jsonRequest(url, method, token, body) {
  // console.log(method, 'method')
  // console.log(token, 'token')
  // console.log(body, 'body')
  return processResponse(fetchJson(url, method, token, body))
}
