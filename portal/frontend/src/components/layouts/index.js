import PublicLayout from './Public'

const LayoutWrapper = (props) => {
  return <PublicLayout {...props}>{props.children}</PublicLayout>
}

export default LayoutWrapper
