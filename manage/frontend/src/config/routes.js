import React from 'react'
import {Redirect} from 'react-router-dom'

import {checkAuth} from '../common/utils/auth'

import BaseRoute from '../client/layout/baseRoute'
import BaseLayout from '../client/layout/baseLayout'
import LoginLayout from '../client/layout/loginLayout'
// import Index from '../client/pages/home'
import Page403 from '../client/pages/exception/403'
import Page404 from '../client/pages/exception/404'
// auth
import Forgot from '../client/pages/auth/forgot'
import Login from '../client/pages/auth/login'
import Logout from '../client/pages/auth/logout'
import ResetPassword from '../client/pages/auth/resetPassword'
// pages
import ArticleList from '../client/pages/article/List'
import Dashboard from '../client/pages/dashboard/index'
import DeviceTokenList from '../client/pages/mobile/deviceToken/List'
import FaqList from '../client/pages/faq/List'
import PushNotificationCreate from '../client/pages/mobile/pushNotification/Create'
import PushNotificationEdit from '../client/pages/mobile/pushNotification/Edit'
import PushNotificationList from '../client/pages/mobile/pushNotification/List'
import User from '../client/pages/user/List'
import UserType from '../client/pages/userType/List'
import UserSettings from '../client/pages/account/Settings'
// Reference
import ReferenceType from '../client/pages/reference/type/List'
import ReferenceData from '../client/pages/reference/data/List'
import CountryList from '../client/pages/reference/country/List'

const Routes = [
  {
    component: BaseRoute,
    routes: [
      {
        component: LoginLayout,
        path: '/auth',
        routes: [
          {
            path: '/auth/login',
            exact: true,
            component: Login,
          },
          {
            path: '/auth/logout',
            exact: true,
            component: Logout,
          },
          {
            path: '/auth/forgot',
            exact: true,
            component: Forgot,
          },
          {
            path: '/auth/reset-password/:username/:token',
            exact: true,
            component: ResetPassword,
          },
        ],
      },
      {
        path: '/',
        component: BaseLayout,
        routes: [
          {
            path: '/',
            exact: true,
            render: () => <Redirect to='/dashboard'/>,
          },
          {
            path: '/dashboard',
            exact: true,
            // authority: ['ROLE_MANAGE_DEFAULT'],
            render: (props) => (checkAuth('ROLE_MANAGE_DEFAULT') ? <Dashboard {...props}/> :
              <Redirect to='/auth/login'/>),
          },
          {
            path: '/content/article',
            exact: true,
            render: (props) => (checkAuth('ROLE_ARTICLE_MANAGE') ? <ArticleList {...props}/> :
              <Page403/>),
          },
          {
            path: '/reference/country',
            exact: true,
            render: (props) => (checkAuth('ROLE_COUNTRY_MANAGE') ? <CountryList {...props}/> :
              <Page403/>),
          },
          {
            path: '/reference/faq',
            exact: true,
            render: (props) => (checkAuth('ROLE_FAQ_MANAGE') ? <FaqList {...props}/> :
              <Page403/>),
          },
          {
            path: '/reference/type',
            exact: true,
            render: (props) => (checkAuth('ROLE_REFERENCE_TYPE_MANAGE') ? <ReferenceType {...props}/> :
              <Page403/>),
          },
          {
            path: '/reference/data',
            exact: true,
            render: (props) => (checkAuth('ROLE_REFERENCE_DATA_MANAGE') ? <ReferenceData {...props}/> :
              <Page403/>),
          },
          {
            path: '/mobile/device-token',
            exact: true,
            render: (props) => (checkAuth(['ROLE_PUSH_NOTIFICATION_VIEW', 'ROLE_PUSH_NOTIFICATION_MANAGE']) ? <DeviceTokenList {...props}/> :
              <Page403/>),
          },
          {
            path: '/mobile/push-notification',
            exact: true,
            render: (props) => (checkAuth(['ROLE_PUSH_NOTIFICATION_VIEW', 'ROLE_PUSH_NOTIFICATION_MANAGE']) ? <PushNotificationList {...props}/> :
              <Page403/>),
          },
          {
            path: '/mobile/push-notification/create',
            exact: true,
            render: (props) => (checkAuth('ROLE_PUSH_NOTIFICATION_MANAGE') ? <PushNotificationCreate {...props}/> :
              <Page403/>),
          },
          {
            path: '/mobile/push-notification/:id',
            exact: true,
            render: (props) => (checkAuth(['ROLE_PUSH_NOTIFICATION_VIEW', 'ROLE_PUSH_NOTIFICATION_MANAGE']) ? <PushNotificationEdit {...props}/> :
              <Page403/>),
          },
          // {
          //   path: '/payment/list',
          //   exact: true,
          //   render: (props) => (checkAuth(['ROLE_PAYMENT_VIEW', 'ROLE_PAYMENT_MANAGE']) ?
          //     <PaymentList {...props}/> : <Redirect to='/auth/login'/>),
          // },
          // {
          //   path: '/payment-statement/list',
          //   exact: true,
          //   render: (props) => (checkAuth(['ROLE_PAYMENT_VIEW', 'ROLE_PAYMENT_MANAGE']) ?
          //     <PaymentStatementList {...props}/> : <Redirect to='/auth/login'/>),
          // },
          {
            path: '/user/list',
            exact: true,
            render: (props) => (checkAuth(['ROLE_USER_VIEW', 'ROLE_USER_MANAGE']) ? <User {...props}/> : <Redirect to='/auth/login'/>),
          },
          {
            path: '/user/settings',
            exact: true,
            render: (props) => (checkAuth('ROLE_MANAGE_DEFAULT') ? <UserSettings {...props}/> :
              <Page403/>),
          },
          {
            path: '/user/type',
            exact: true,
            render: (props) => (checkAuth('ROLE_BUSINESS_ROLE_MANAGE') ? <UserType {...props}/> :
              <Page403/>),
          },
          {
            path: '/403',
            exact: false,
            component: Page403,
          },
          {
            path: '*',
            exact: false,
            component: Page404,
          },
        ],
      },
    ],
  },
]

export default Routes
