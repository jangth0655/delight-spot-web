'use client';

import { useMount } from '@/hooks/useMount';
import { Suspense } from 'react';

type Props = React.ComponentProps<typeof Suspense>;

export default function SSRSuspense(props: Props) {
  const { fallback } = props;
  const isMount = useMount();

  if (isMount) {
    return <Suspense {...props} />;
  }

  return <>{fallback}</>;
}
