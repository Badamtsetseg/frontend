import {observable, action, makeObservable, runInAction} from 'mobx'
import {changePassword, getProfile, updateProfile} from '../services/account'

class AccountStore {
  @observable profile = {}
  @observable loading = false

  constructor() {
    makeObservable(this)
  }

  @action
  setProfile(data) {
    this.profile = Object.assign(this.profile, data)
  }

  @action
  changePassword(payload) {
    return changePassword(payload)
  }

  @action
  getProfile() {
    this.loading = true
    const promise = getProfile()
    promise.then(response => {
      if (response.result === true && response.data) {
        this.setProfile(response.data)
      } else {
        this.setProfile({})
      }
      runInAction(() => {
        this.loading = false
      })
    })
    return promise
  }

  @action
  updateProfile(payload) {
    return updateProfile(payload)
  }
}

export default AccountStore
