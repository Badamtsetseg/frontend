import {observable, action, makeAutoObservable} from 'mobx'
import {list, select, create, update, deleteOne, get, getForCode} from '../../services/reference/type'

class ReferenceTypeStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable searchFormValues = {}

  @observable loading = false
  @observable selectLoading = false
  @observable current = {}
  @observable selectData = []
  @observable currentKey = []

  constructor() {
    makeAutoObservable(this)
  }

  @action
  fetchList(payload) {
    this.loading = true
    list(Object.assign({deleted: false}, payload)).then(response => {
      if (response.result === true && response.data) {
        response.data.status = response.result
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
      if (response.result === true && response.data) {
        this.current = response.data
      }
      this.loading = false
    })
    return promise
  }

  @action
  fetchForCode(payload) {
    const promise = getForCode(Object.assign({deleted: false}, payload))
    promise.then(response => {
      if (response.result === true && response.data) {
        this.current = response.data
      }
      this.loading = false
    })
    return promise
  }

  @action
  fetchSelect(payload) {
    this.selectLoading = true
    select(Object.assign({deleted: false}, payload)).then(response => {
      if (response.result === true && response.data) {
        this.selectData = response.data
      }
      this.selectLoading = false
    })
  }

  @action
  create(payload) {
    const promise = create(payload)
    promise.then(response => {
      if (response.result === true && response.data) {
        this.current = response.data
      }
      this.loading = false
    })
    return promise
  }

  @action
  update(payload) {
    const promise = update(payload)
    promise.then(response => {
      if (response.result === true && response.data) {
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
  setSearchFormValues(current) {
    this.searchFormValues = current
  }

  @action
  clearCurrent() {
    this.current = {}
  }
}

export default ReferenceTypeStore
