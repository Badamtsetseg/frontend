import {makeObservable, observable} from 'mobx'

class DashboardStore {
  @observable data = {}

  constructor() {
    makeObservable(this)
  }
}

export default DashboardStore
