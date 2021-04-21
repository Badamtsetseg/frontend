import {observable, action, makeAutoObservable, runInAction} from 'mobx'
import {getList, getById, select} from '../../../services/shared/reference/data'

export default class ReferenceDataStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable loading = true

  @observable currentData = {}
  @observable currentLoading = true

  @observable selectData = {}
  @observable selectLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  @action 
  fetchList(payload) {
    this.loading = true
    getList(payload).then(response => {
      if (response.result === true && response.data) {
        runInAction(() => {
          this.data = response.data
        })
      }
      this.loading = false
    })
  }

  @action 
  fetchCurrent(payload) {
    this.currentLoading = true
    getById(payload).then(response => {
      if (response.result === true && response.data) {
        runInAction(() => {
          this.currentData = response.data
        })
      }
      this.currentLoading = false
    })
  }

  @action 
  fetchSelect(payload) {
    this.selectLoading = true
    select(payload).then(response => {
      if (response.result === true && response.data) {
        runInAction(() => {
          this.selectData = response.data
        })
      }
      this.selectLoading = false
    })
  }
}
