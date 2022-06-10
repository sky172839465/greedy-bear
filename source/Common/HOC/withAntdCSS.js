import 'antd/dist/antd.css'

function withAntdCSS(Component) {
  return (props) => Component(props)
}

export default withAntdCSS
