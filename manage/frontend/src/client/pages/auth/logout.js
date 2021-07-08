import React, {useEffect} from 'react'
import {observe} from 'mobx'
import {inject, observer} from 'mobx-react'

const Logout = observer((
  {
    authStore,
    history,
  }) => {

  useEffect(() => {
    let observerDisposer = observe(authStore.values, change => {
      /*
      console.log(
        change.type,
        change.name,
        'from',
        change.oldValue,
        'to',
        change.object[change.name]
      )*/
      if (change.name === 'status') {
        const authStatus = change.object[change.name]
        if (authStatus === false) {
          // redirect
          history.push('/')
        }
      }
    })
    authStore.reset()

    /*
    if (authStore.values.status === true) {
      // logged in
      history.push('/')
    }
    */

    return function cleanup() {
      if (observerDisposer) {
        observerDisposer()
      }
    }
  }, [])

  return (
    <div>
      <h2>Logging out ...</h2>
    </div>
  )
})

const LogoutWrapper = inject(stores => {
  return ({
    authStore: stores.authStore,
  })
})(Logout)

export default LogoutWrapper
