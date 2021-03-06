import {observable, action, makeAutoObservable, runInAction} from 'mobx'
import {getList, getById} from '../../services/shared/article'

export default class ArticleStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable loading = true

  @observable importantData = {
    list: [],
    pagination: [],
  }
  @observable importantLoading = true

  @observable currentData = {}
  @observable currentLoading = true

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
  fetchImportantList(payload) {
    this.importantLoading = true
    getList(payload).then(response => {
      if (response.result === true && response.data) {
        runInAction(() => {
          this.importantData = response.data
        })
      }
      this.importantLoading = false
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
}
