import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'

class BaseRoute extends Component {
  render() {
    const {route} = this.props
    return (
      <div>
        {route != null ? renderRoutes(route.routes) : null}
      </div>
    )
  }
}

/*const BaseRoute = ({ route }) => (
  <div>
    <h1>BaseRoute Route</h1>
    {route != null ? renderRoutes(route.routes) : null}
  </div>
)*/

export default BaseRoute
