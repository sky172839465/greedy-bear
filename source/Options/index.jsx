import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../Common/Component/ErrorFallback'
import Options from './Options'
import '../I18N/init'

const root = createRoot(document.getElementById('options-root'))
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Options />
    </ErrorBoundary>
  </React.StrictMode>,
)
