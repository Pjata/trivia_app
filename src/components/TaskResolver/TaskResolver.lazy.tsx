import React, { lazy, Suspense } from 'react'
import TaskResolver from './TaskResolver'

const LazyTaskResolver = lazy(() => import('./TaskResolver'))

const Round = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <TaskResolver {...props} />
  </Suspense>
)

export default Round
