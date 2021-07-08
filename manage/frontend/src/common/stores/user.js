import {action, makeObservable, observable, runInAction} from 'mobx'
import {create, deleteOne, list, listSource, resendActivationEmail, select, update} from '../services/user'

class UserStore {
  @observable loading = true
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable select = []
  @observable positions = []
  @observable sources = []

  @observable sendingActivationEmail = false

  constructor() {
    makeObservable(this)
  }

  @action
  fetchList(payload) {
    this.loading = true
    list(Object.assign({deleted: false}, payload))
      .then(response => {
        if (response.result === true && response.data) {
          runInAction(() => {
            this.data = response.data
          })
        }
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  fetchSelect(payload) {
    this.loading = true
    select(Object.assign({deleted: false}, payload))
      .then(response => {
        if (response.result === true && response.data) {
          runInAction(() => {
            this.select = response.data
          })
        }
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  fetchSources() {
    this.loading = true
    listSource()
      .then(response => {
        if (response.result === true && response.data) {
          runInAction(() => {
            this.sources = response.data
          })
        }
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  create(payload) {
    return create(payload)
  }

  @action
  update(payload) {
    return update(payload)
  }

  @action
  deleteOne(id) {
    return deleteOne(id)
  }

  @action
  resendActivationEmail(id) {
    this.sendingActivationEmail = true
    const promise = resendActivationEmail(id)
    promise.then(() => {
      runInAction(() => {
        this.sendingActivationEmail = false
      })
    })
    return promise
  }
}

export default UserStore
