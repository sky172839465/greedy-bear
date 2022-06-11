import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../Common/Component/ErrorFallback'
import App from './App'
import '../I18N/init'

const app = () => {
  const greedyBearRootId = 'greedyBearRoot'
  const greedyBearRoot = document.createElement('div')
  greedyBearRoot.id = greedyBearRootId
  document.body.appendChild(greedyBearRoot)
  const root = createRoot(document.getElementById(greedyBearRootId))
  root.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}

export default app
