import {observable, action, runInAction, makeObservable} from 'mobx'
import {list, create, update, deleteOne} from '../services/faq'

class FaqStore {
  @observable data = {
    list: [],
    pagination: [],
  }
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

export default FaqStore
