import * as React from 'react'
import { useTranslation } from 'react-i18next'

function ErrorFallback({ error, resetErrorBoundary }) {
  const { t } = useTranslation()
  return (
    <div role='alert'>
      <p>{t('errorTitle')}</p>
      <pre>{error.message}</pre>
      <button type='button' onClick={resetErrorBoundary}>{t('errorRetryBtnText')}</button>
    </div>
  )
}

export default ErrorFallback
