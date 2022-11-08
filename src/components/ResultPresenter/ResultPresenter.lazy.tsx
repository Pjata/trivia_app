import React, { lazy, Suspense } from 'react'
import ResultPresenter from './ResultPresenter'

const LazyTResultPresenter = lazy(() => import('./ResultPresenter'))

const Round = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <ResultPresenter {...props} />
  </Suspense>
)

export default Round
