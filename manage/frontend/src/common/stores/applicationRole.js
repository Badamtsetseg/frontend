import {observable, action, runInAction, makeObservable} from 'mobx'
import list from '../services/applicationRole'

class ApplicationRoleStore {
  @observable list = []
  @observable loading = false

  constructor() {
    makeObservable(this)
  }

  @action
  setList(data) {
    this.list = Object.assign(this.list, data)
  }

  @action
  fetchRoles(payload) {
    this.loading = true
    list(payload).then(apiResult => {
      if (apiResult.result === true && apiResult.data) {
        runInAction(() => {
          this.setList(apiResult.data)
        })
      }
      runInAction(() => {
        this.loading = false
      })
    })
  }
}

export default ApplicationRoleStore