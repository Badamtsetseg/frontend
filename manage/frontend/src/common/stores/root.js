import AccountStore from './account'
import ApplicationRoleStore from './applicationRole'
import ArticleStore from './article'
import AuthStore from './auth'
import BusinessRoleStore from './businessRole'
import CountryStore from './reference/country'
import DashboardStore from './dashboard'
import DeviceTokenStore from './deviceToken'
import FaqStore from './faq'
import LangStore from './lang'
import LocationStore from './location'
import PushNotificationStore from './pushNotification'
import ReferenceDataStore from './reference/data'
import ReferenceTypeStore from './reference/type'
import UserStore from './user'

class RootStore {
  accountStore = null
  applicationRoleStore = null
  authStore = null
  articleStore = null
  businessRoleStore = null
  countryStore = null
  dashboardStore = null
  deviceTokenStore = null
  faqStore = null
  langStore = null
  locationStore = null
  pushNotificationStore = null
  referenceDataStore = null
  referenceTypeStore = null
  userStore = null

  constructor() {
    this.accountStore = new AccountStore()
    this.applicationRoleStore = new ApplicationRoleStore()
    this.authStore = new AuthStore()
    this.articleStore = new ArticleStore()
    this.businessRoleStore = new BusinessRoleStore()
    this.countryStore = new CountryStore()
    this.dashboardStore = new DashboardStore()
    this.deviceTokenStore = new DeviceTokenStore()
    this.faqStore = new FaqStore()
    this.langStore = new LangStore()
    this.locationStore = new LocationStore()
    this.pushNotificationStore = new PushNotificationStore()
    this.referenceDataStore = new ReferenceDataStore()
    this.referenceTypeStore = new ReferenceTypeStore()
    this.userStore = new UserStore()
  }

  getStores() {
    return {
      accountStore: this.accountStore,
      applicationRoleStore: this.applicationRoleStore,
      authStore: this.authStore,
      articleStore: this.articleStore,
      businessRoleStore: this.businessRoleStore,
      countryStore: this.countryStore,
      dashboardStore: this.dashboardStore,
      deviceTokenStore: this.deviceTokenStore,
      faqStore: this.faqStore,
      langStore: this.langStore,
      locationStore: this.locationStore,
      pushNotificationStore: this.pushNotificationStore,
      referenceDataStore: this.referenceDataStore,
      referenceTypeStore: this.referenceTypeStore,
      userStore: this.userStore,
    }
  }
}

export default RootStore
