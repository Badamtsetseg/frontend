import {action, makeObservable, observable, runInAction} from 'mobx'
import {list} from '../services/deviceToken'

class DeviceTokenStore {
  @observable data = {
    list: [],
    pagination: [],
  }
  @observable loading = false
  @observable searchFormValues = {}

  deviceTypes = [
    {value: 'ios', label: 'ios'},
    {value: 'android', label: 'android'},
  ]

  constructor() {
    makeObservable(this)
  }

  @action
  setSearchFormValues(current) {
    this.searchFormValues = current
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
}

export default DeviceTokenStore
