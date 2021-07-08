const ACCESS_AUTH_DATA = 'ast-auth-data'

export function checkAuth(authority) {
  if (process.env.NODE_TARGET === 'node') {
    // running on server side, so return true to avoid redirecting to login on server side
    // hackfix
    return true
  }
  
  if (!authority) {
    return true
  }

  const authData = getAuthData()
  if (!authData) {
    return false
  }

  if (authData.status === true) {
    if (Array.isArray(authority)) {
      if (authority.indexOf(authData.businessRole.applicationRoles) >= 0) {
        return true
      }

      if (Array.isArray(authData.businessRole.applicationRoles)) {
        for (let i = 0; i < authData.businessRole.applicationRoles.length; i += 1) {
          const appRole = authData.businessRole.applicationRoles[i]
          if (authority.indexOf(appRole) >= 0) {
            return true
          }
        }
      }
    }

    if (typeof authority === 'string') {
      if (authority === authData.businessRole.applicationRoles) {
        return true
      }
      if (Array.isArray(authData.businessRole.applicationRoles)) {
        if (authData.businessRole.applicationRoles.indexOf(authority) >= 0) {
          return true
        }
      }
    }
  }

  return false
}

export function getAuthData() {
  let authData

  // authData = { status: false, businessRole: { role: 'ANONYMOUS', applicationRoles: ['ROLE_ANONYMOUS'] } }
  if (process.env.NODE_TARGET !== 'node') {
    try {
      authData = JSON.parse(localStorage.getItem(ACCESS_AUTH_DATA))
    } catch (e) {
    }
  }

  return authData
}

export function setAuthData(authData) {
  if (process.env.NODE_TARGET !== 'node') {
    try {
      localStorage.setItem(ACCESS_AUTH_DATA, JSON.stringify(authData))
    } catch (e) {
      //
    }
  }
}

export function getBusinessRole() {
  let businessRole
  if (process.env.NODE_TARGET !== 'node') {
    try {
      // console.log(authData)
      businessRole = JSON.parse(localStorage.getItem(ACCESS_AUTH_DATA)).businessRole.role
    } catch (e) {
      //
    }
  }
  return businessRole
}
