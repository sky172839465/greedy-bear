import * as React from 'react'
import {
  Modal,
  Form,
  Switch,
  Slider,
} from 'antd'

function ConfigModal(props) {
  const {
    visible,
    onClose,
  } = props
  const form = Form.useFormInstance()

  const onFinish = () => {
    onClose()
  }

  return (
    <Modal
      title='Config'
      visible={visible}
      onCancel={onClose}
      onOk={form.submit}
      centered={false}
      footer={null}
      width='60%'
      zIndex={1001}
      forceRender
    >
      <Form
        form={form}
        layout='horizontal'
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 15,
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Performance'
          name='performance'
          valuePropName='checked'
          tooltip='Improve draw image performance, if want to download image please turn off this feature.'
          wrapperCol={{ span: 2 }}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label='Image width'
          name='imageWidth'
          tooltip='Image width, if width less than 50% can merge multiple images.'
        >
          <Slider
            min={50}
            max={100}
            step={5}
            marks={{ 50: '50%', 100: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ConfigModal
