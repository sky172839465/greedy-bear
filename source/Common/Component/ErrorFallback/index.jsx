import * as React from 'react'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type='button' onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback
