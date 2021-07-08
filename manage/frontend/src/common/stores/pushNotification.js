import {observable, action, makeObservable, runInAction} from 'mobx'
import {list, get, create, update, deleteOne} from '../services/pushNotification'

class PushNotificationStore {
  @observable data = {
    list: [],
    pagination: [],
  }

  @observable current = {}
  @observable loading = false

  @observable searchFormValues = {}

  types = [
    {value: 'DEFAULT', label: 'Энгийн'},
    {value: 'SERVICE', label: 'Үйлчилгээ'},
    // {value: 'PAYMENT', label: 'Төлбөр'},
    {value: 'NEWS', label: 'Мэдээ'},
    {value: 'EMERGENCY', label: 'Анхааруулга'},
  ]

  sendTypes = [
    {value: 'DIRECT', label: 'Шууд'},
    {value: 'CRON', label: 'Дараа'},
  ]

  receiverTypes = [
    {value: 'USERNAME', label: '1 username-лүү'},
    {value: 'TOKEN', label: '1 device token-руу'},
    {value: 'ALL', label: 'Бүх суулгасан хэрэглэгчрүү'},
  ]

  priorities = [
    {value: '100', label: 'HIGH'},
    {value: '50', label: 'NORMAL'},
    {value: '0', label: 'LOW'},
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
    list(payload).then(response => {
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
  fetch(payload, callback) {
    this.loading = true
    get(payload).then(response => {
      if (response.result === true && response.data) {
        runInAction(() => {
          this.current = response.data
        })
      }

      if (callback)
        callback(response.data)

      runInAction(() => {
        this.loading = false
      })
    })
  }

  @action
  create(payload) {
    this.loading = true
    const promise = create(payload)
    promise
      .then(() => {
        runInAction(() => {
          this.loading = false
        })
      })
      .catch(() => {
        runInAction(() => {
          this.loading = false
        })
      })
    return promise
  }

  @action
  update(payload) {
    return update(payload)
  }

  @action
  deleteOne(id) {
    return deleteOne(id)
  }
}

export default PushNotificationStore
