import React, { lazy, Suspense } from 'react';

const LazyTaskManager = lazy(() => import('./TaskManager'));

const Round = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTaskManager {...props} />
  </Suspense>
);

export default Round;
