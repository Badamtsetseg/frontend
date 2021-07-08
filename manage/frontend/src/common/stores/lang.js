import {observable, action, makeObservable} from 'mobx'

class LangStore {
  @observable locale = 'mn'

  @action
  setLocale(locale) {
    this.locale = locale
  }

  constructor(locale) {
    makeObservable(this)
    this.locale = locale
  }
}

export default LangStore
