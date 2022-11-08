import React, { lazy, Suspense } from 'react'

const LazyPaperManager = lazy(() => import('./PaperManager'))

const PaperManager = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyPaperManager {...props} />
  </Suspense>
)

export default PaperManager
