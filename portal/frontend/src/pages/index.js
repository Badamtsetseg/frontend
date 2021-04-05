import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {Loader} from '../components/elements'

const Base = () => {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/home')
  })

  return <Loader/>
}

export default Base
