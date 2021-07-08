// if (typeof (window) === 'undefined') {
//   global.window = {}
// }

let API_URL = 'http://localhost:8080/api'
let CDN_URL = 'http://localhost:9090/api'

if (typeof (window) !== 'undefined' && window.env) {
  API_URL = window.env.API_URL
  CDN_URL = window.env.CDN_URL
}

export function getApiUrl() {
  return API_URL
}

export function getCdnUrl() {
  return CDN_URL
}

export function getCdnUploadUrl() {
  return CDN_URL + '/s3/upload'
}

export function getPushNotificationApiUrl() {
  return null
}

export function getArcGisBaseUrl() {
  return null
}

export function getLocale() {
  // TODO stores and impl later
  return 'mn'
}

export function getArcGisFeatureLayerUrl() {
  let LAYER_URL = '/starter'
  if (process.env.NODE_ENV === 'development') {
    LAYER_URL = '/starter_test'
  }

  return getArcGisBaseUrl() + LAYER_URL + '/FeatureServer/0'
}
