import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../Common/Component/ErrorFallback'
import Popup from './Popup'
import '../I18N/init'

const root = createRoot(document.getElementById('popup-root'))
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Popup />
    </ErrorBoundary>
  </React.StrictMode>,
)
