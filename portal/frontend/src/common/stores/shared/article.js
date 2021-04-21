import {observable, action, makeAutoObservable, runInAction} from 'mobx'
import {getList} from '../../services/shared/article'

export default class ArticleStore {
  @observable data = null
  @observable loading = true

  constructor() {
    makeAutoObservable(this)
  }

  @action 
  fetchList(payload) {
    this.loading = true
    const promise= getList(payload)
    promise.then(response => {
      if (response.result === true && response.data) {
        runInAction(() => {
          this.data = response.data
        })
      }
      this.loading = false
    })
    return promise
  }
}
