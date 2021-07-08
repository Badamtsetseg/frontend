import loadable from '@loadable/component'
import React, {useMemo} from 'react'
// const DynamicIcon = loadable(props =>
//   import(`@ant-design/icons/es/icons/${props.type}.js`)
//     .then(response => {
//       return response
//     })
//     .catch(err => import('@ant-design/icons/es/icons/WarningOutlined.js')));

const icons = require('@ant-design/icons')
const DynamicIcon = ({type, ...rest}) => {
  const Component = icons[type]
  return <Component {...rest} />
}

export default DynamicIcon
