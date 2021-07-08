import React from 'react'
import {Link} from 'react-router-dom'
import {Trans} from 'react-i18next'

import Exception from '../../components/Exception'

export default () => (
  <Exception
    type='403'
    linkElement={Link}
    desc={<Trans>exception.403</Trans>}
    backText={<Trans>exception.backToHome</Trans>}
  />
)
