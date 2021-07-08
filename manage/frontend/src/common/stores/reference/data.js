import {observable, makeAutoObservable, action} from 'mobx'
import {list, get, select, create, update, deleteOne} from '../../services/reference/data'

class ReferenceDataStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable searchFormValues = {}

  @observable current = {}
  @observable selectData = []
  @observable loading = false

  constructor() {
    makeAutoObservable(this)
  }

  @action
  fetchList(payload) {
    this.loading = true
    list(payload).then(response => {
      if (response.result && response.data) {
        this.data = response.data
      }
      this.loading = false
    })
  }

  @action
  fetch(payload) {
    this.loading = true
    const promise = get(Object.assign({deleted: false}, payload))
    promise.then(response => {
      if (response.result && response.data) {
        this.current = response.data
      }
      this.loading = false
    })
    return promise
  }

  @action
  selectDatas(payload) {
    return select(Object.assign({deleted: false}, payload))
  }

  @action
  create(payload) {
    this.loading = true
    const promise = create(payload)
    promise.then(response => {
      if (response.result && response.data) {
        this.current = response.data
      }
      this.loading = false
    })
    return promise
  }

  @action
  update(payload) {
    this.loading = true
    const promise = update(payload)
    promise.then(response => {
      if (response.result && response.data) {
        this.current = response.data
      }
      this.loading = false
    })
    return promise
  }

  @action
  deleteOne(payload) {
    return deleteOne(payload)
  }

  @action
  setSearchFormValues(searchFormValues) {
    this.searchFormValues = searchFormValues
  }
}

export default ReferenceDataStore
