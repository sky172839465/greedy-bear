import * as React from 'react'
import { SelectOutlined } from '@ant-design/icons'
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
  useQuery,
} from 'react-query'
import { ScrollSensor } from 'scroll-sensor'
import { isEmpty } from 'lodash'
import { fetchAllViewPageUrls } from '../Common/API/fetchAllViewPageUrls'
import { fetchAllRealImageUrls } from '../Common/API/fetchAllRealImageUrls'
import CustomIconButton from './CustomIconButton'
import VerticalViewModal from './VerticalViewModal'
import 'antd/dist/antd.css'

const queryCache = new QueryCache()
const queryClient = new QueryClient({ queryCache })

function App() {
  const [visible, setVisible] = React.useState(false)

  const viewPageResult = useQuery(
    'viewPageUrls',
    () => fetchAllViewPageUrls(window.location.href, 0, []),
    {
      enabled: visible,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )
  const { data: viewPageUrls } = viewPageResult
  const realImageResult = useQuery(
    'realImageUrls',
    () => fetchAllRealImageUrls(viewPageUrls),
    {
      enabled: !isEmpty(viewPageUrls),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )

  const scrollSensorRef = React.useRef(null)
  const onGreedyBearClick = async () => {
    setVisible(true)
    await setTimeout(Promise.resolve, 500)
    const domContent = document.querySelector('.ant-modal-content')
    scrollSensorRef.current = new ScrollSensor({
      element: domContent,
    })
    document.body.style.overflow = 'hidden'
    scrollSensorRef.current.on('scroll', (event) => {
      domContent.scrollTop = event.scrollTop
      domContent.scrollLeft = event.scrollLeft
    })
  }

  const onModalClose = () => {
    document.body.style.overflow = 'auto'
    setVisible(false)
    scrollSensorRef.current.destroy()
  }

  return (
    <>
      <CustomIconButton
        onClick={onGreedyBearClick}
        icon={SelectOutlined}
        style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
      />
      <VerticalViewModal
        visible={visible}
        onClose={onModalClose}
        viewPageResult={viewPageResult}
        realImageResult={realImageResult}
      />
    </>
  )
}

function AppWithQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

export default AppWithQuery
