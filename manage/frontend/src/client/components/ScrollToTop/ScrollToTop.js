import {useEffect} from 'react'
import {withRouter} from 'react-router-dom'

const ScrollToTop = ({children, location: {pathname}}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  return children
}

export default withRouter(ScrollToTop)
