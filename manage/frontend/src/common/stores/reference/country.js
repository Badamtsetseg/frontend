import {observable, action, runInAction, makeObservable} from 'mobx'
import {list, select, create, update, deleteOne} from '../../services/reference/country'

class CountryStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable university = []
  @observable scholarshipCountry = []
  @observable loading = false

  constructor() {
    makeObservable(this)
  }

  @action
  fetchList(payload) {
    this.loading = true
    list(payload)
      .then(response => {
        if (response.result && response.data) {
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
  fetchUniversity(payload) {
    this.loading = true
    select(Object.assign({university: true}, payload))
      .then(response => {
        if (response.result && response.data) {
          runInAction(() => {
            this.university = response.data
          })
        }
        runInAction(() => {
          this.loading = false
        })
      })
  }

  @action
  fetchScholarship(payload) {
    this.loading = true
    select(Object.assign({scholarship: true}, payload))
      .then(response => {
        if (response.result && response.data) {
          runInAction(() => {
            this.scholarshipCountry = response.data
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

export default CountryStore
