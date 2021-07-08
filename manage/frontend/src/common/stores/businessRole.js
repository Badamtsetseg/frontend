import {observable, action, makeObservable, runInAction} from 'mobx'
import {list, select, create, update, deleteOne} from '../services/businessRole'

class BusinessRoleStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable select = []
  @observable loading = false

  constructor() {
    makeObservable(this)
  }

  @action
  fetchList(payload) {
    this.loading = true
    list(payload)
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
    select(payload)
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
  create(payload) {
    return create(payload)
  }

  @action
  update(payload) {
    return update(payload)
  }

  @action
  deleteOne(payload) {
    return deleteOne(payload)
  }
}

export default BusinessRoleStore
