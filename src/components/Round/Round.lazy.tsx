import React, { lazy, Suspense } from 'react';

const LazyRound = lazy(() => import('./Round'));

const Round = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRound {...props} />
  </Suspense>
);

export default Round;
