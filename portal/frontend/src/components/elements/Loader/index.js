import Lottie from 'lottie-react-web'

import LoadingAnimation from '../../../../public/animation/loading.json'

const Loader = () => {
  return (
    <div style={{padding: '150px 0', textAlign: 'center'}}>
      <Lottie
        options={{
          animationData: LoadingAnimation
        }}
        width={150}
        height={150}
      />
    </div>
  )
}

export default Loader
