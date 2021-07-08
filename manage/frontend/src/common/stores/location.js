import {observable, makeAutoObservable, action} from 'mobx'
import {list, getFullName} from '../services/locationService'

class LocationStore {
  @observable data = []
  @observable sum = []
  @observable bag = []

  @observable loading = false

  constructor() {
    makeAutoObservable(this)
  }

  @action
  fetchList(payload) {
    this.loading = true
    const promise = list(payload)
    promise.then(response => {
      if (response.result === true && response.data) {
        this.setList(response.data, payload.parentId)
      }
      this.loading = false
    })
    return promise
  }

  @action
  setList(newData) {
    this.data = newData
  }

  @action
  getFullName(payload) {
    return getFullName(payload)
  }
}

export default LocationStore
