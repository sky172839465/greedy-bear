import * as React from 'react'
import cx from 'classnames'
import { Form, Modal } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import CustomIconButton from '../CustomIconButton'
import OptionsModal from '../OptionsModal'
import FixedProcessCard from '../ProcessCard/FixedProcessCard'
import ImageRows from '../ImageRows'
import styles from './index.module.scss'

const DEFAULT_VALUES = { imageWidth: 60, performance: true }

function VerticalViewModal(props) {
  const {
    visible,
    onClose,
    viewPageResult,
    realImageResult = {},
  } = props
  const { data: realImageUrls } = realImageResult

  const [optionsModalVisible, setOptionsModalVisible] = React.useState(false)
  const [form] = Form.useForm()
  const performance = Form.useWatch('performance', form)

  return (
    <Modal
      title={null}
      footer={null}
      maskStyle={{
        backdropFilter: 'blur(8px)',
        margin: 0,
        width: '100%',
      }}
      centered
      visible={visible}
      onCancel={onClose}
      width='100%'
      wrapClassName={cx(
        styles.modal,
        { [styles.performance]: performance },
      )}
    >
      <FixedProcessCard
        results={[viewPageResult, realImageResult]}
      />
      <br />
      <Form form={form} initialValues={DEFAULT_VALUES}>
        <ImageRows images={realImageUrls} />
        <OptionsModal
          visible={optionsModalVisible}
          onClose={() => setOptionsModalVisible(false)}
        />
      </Form>
      <div className={styles.configArea}>
        <CustomIconButton
          icon={SettingOutlined}
          onClick={() => setOptionsModalVisible(true)}
        />
      </div>
    </Modal>
  )
}

export default VerticalViewModal
