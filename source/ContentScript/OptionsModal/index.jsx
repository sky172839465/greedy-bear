import * as React from 'react'
import {
  Modal,
  Form,
  Select,
  Switch,
  Slider,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { LANG, LANG_MAP } from '../../I18N/resources'

const LANG_OPTIONS = [
  LANG.EN,
  LANG.ZH,
].map((lang) => ({ value: lang, label: LANG_MAP[lang] }))

function OptionsModal(props) {
  const {
    visible,
    onClose,
  } = props
  const { t, i18n } = useTranslation()
  const form = Form.useFormInstance()

  const onFinish = () => {
    onClose()
  }

  const onLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Modal
      title={t('optionsModalTitle')}
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
          label={t('optionsModalFormLangFieldTitle')}
          name='lang'
          tooltip={t('optionsModalFormLangFieldDesc')}
        >
          <Select
            onChange={onLanguageChange}
            options={LANG_OPTIONS}
            defaultValue={i18n.language}
          />
        </Form.Item>
        <Form.Item
          label={t('optionsModalFormPerfFieldTitle')}
          name='performance'
          valuePropName='checked'
          tooltip={t('optionsModalFormPerfFieldDesc')}
          wrapperCol={{ span: 2 }}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={t('optionsModalFormImgWidthFieldTitle')}
          name='imageWidth'
          tooltip={t('optionsModalFormImgWidthFieldDesc')}
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

export default OptionsModal
