import * as React from 'react'
import { Collapse, Timeline, Typography } from 'antd'
import { isUndefined } from 'lodash'
import styles from './index.module.scss'

const { Panel } = Collapse
const { Item } = Timeline
const { Text } = Typography

const processList = [
  'Fetching image view page urls',
  'Fetching real image urls',
]

function ProcessCard(props) {
  const {
    results = [],
    setWithOffset = () => {},
  } = props
  const isFetchFinished = !results.some((result) => result.isLoading)

  const [activeKey, setActiveKey] = React.useState('fetchingData')
  const onCollapseChange = (key) => {
    setActiveKey(key)
    setWithOffset(!isUndefined(key))
  }

  React.useEffect(() => {
    if (isFetchFinished) {
      setActiveKey('')
    }
  }, [isFetchFinished])

  return (
    <Collapse
      className={styles.collaspe}
      activeKey={[activeKey]}
      onChange={onCollapseChange}
      bordered={false}
      accordion
    >
      <Panel header={isFetchFinished ? 'Data fetched' : 'Fetching data'} key='fetchingData'>
        <Timeline pending={processList[results.findIndex((result) => result.isLoading)]}>
          {
            results.filter((result) => result.data).map((result, index) => {
              const { error } = result
              const processDesc = processList[index]
              if (error) {
                return (
                  <Item key={processDesc} color='red'>
                    <p>{processDesc}</p>
                    <Text type='danger'>{error.message}</Text>
                  </Item>
                )
              }

              return (
                <Item key={processDesc} color='green'>{processList[index]}</Item>
              )
            })
          }
          {
            isFetchFinished && (
              <Item key='done' color='green'>Done</Item>
            )
          }
        </Timeline>
      </Panel>
    </Collapse>
  )
}

export default ProcessCard
