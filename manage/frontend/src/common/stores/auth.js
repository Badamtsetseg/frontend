import {action, makeObservable, observable, runInAction} from 'mobx'
import {checkPasswordResetToken, checkToken, login, resetPassword, setPassword} from '../services/login'
import {getAuthData, setAuthData} from '../utils/auth'

class AuthStore {
  @observable values = {
    status: false,
    userId: null,
    username: null,
    email: null,
    token: null,
    businessRole: 'ANONYMOUS',
    applicationRoles: ['ROLE_ANONYMOUS'],
    avatar: null,
    fullName: null,
  }

  constructor() {
    makeObservable(this)
    this.checkToken()

    if (typeof (caches) !== 'undefined') {
      try {
        // TODO remove later
        caches.keys().then(cacheNames => {
          cacheNames.map(cacheName => {
            // console.log('checking cache name: ' + cacheName)
            if (!cacheName.startsWith('starter')) {
              // console.log('removing cache: ' + cacheName)
              return caches.delete(cacheName)
            }
          })
        })

        // caches.keys().then(cacheNames => {
        //   cacheNames.map(cacheName => {
        //     if (cacheName.startsWith('starter-precache-v2')) {
        //       this.appVersion = cacheName
        //     }
        //   })
        // })
      } catch (e) {
        // console.log(e)
      }
    }
  }

  @action
  reset() {
    setAuthData({})

    this.values.status = false
    this.values.userId = null
    this.values.username = null
    this.values.email = null
    this.values.token = null
    this.values.businessRole = 'ANONYMOUS'
    this.values.applicationRoles = ['ROLE_ANONYMOUS']
    this.values.avatar = null
    this.values.fullName = null
  }

  @action
  checkToken() {
    try {
      const authData = getAuthData()
      //console.log('initial auth data ->')
      //console.log(authData)
      if (authData) {
        // check token with server
        checkToken(authData.token)
          .then(response => {
            if (!response.result) {
              this.reset()
            } else {
              this.updateAuthData(authData)
            }
          })
          .catch(() => {
            this.reset()
          })
      } else {
        this.reset()
      }
    } catch (e) {
      // console.log(e)
    }
  }

  @action
  updateAuthData(authData) {
    setAuthData(authData)

    this.values.status = authData.status
    this.values.userId = authData.userId
    this.values.username = authData.username
    this.values.email = authData.email
    this.values.token = authData.token
    if (authData.businessRole) {
      this.values.businessRole = authData.businessRole.role
      this.values.applicationRoles = authData.businessRole.applicationRoles
    }
    this.values.fullName = authData.fullName
    this.values.avatar = authData.avatar
    //console.log('st: ' + this.values.status)
  }

  @action
  login(username, password) {
    const promise = login(username, password)
    promise
      .then(response => {
        if (response.result) {
          this.updateAuthData(Object.assign(response.data, {status: true}))
        } else {
          this.reset()
        }
      })
      .catch(() => {
        this.reset()
      })

    return promise
  }

  @action
  resetPassword(username) {
    this.loading = true
    const promise = resetPassword(username)
    promise.then(() => {
      runInAction(() => {
        this.loading = false
      })
    }).catch(() => {
      runInAction(() => {
        this.loading = false
      })
    })
    return promise
  }

  @action
  checkPasswordResetToken(payload) {
    this.loading = true
    const promise = checkPasswordResetToken(payload)
    promise.then(() => {
      runInAction(() => {
        this.loading = false
      })
    }).catch(() => {
      runInAction(() => {
        this.loading = false
      })
    })
    return promise
  }

  @action
  setPassword(payload) {
    return setPassword(payload)
  }

  // toJson() {
  //   return {
  //     status: this.values.status,
  //     userId: this.values.userId,
  //     token: this.values.token,
  //     businessRole: this.values.businessRole,
  //     applicationRoles: this.values.applicationRoles,
  //     avatar: this.values.avatar,
  //     fullName: this.values.fullName
  //   }
  // }
}

export default AuthStore
