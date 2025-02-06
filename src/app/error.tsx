'use client';

import { useEffect } from 'react';
import { Button } from '@/shadcn/button';
import ServerError from '@/molecules/ServerError';

// ============================================================================

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <ServerError
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => reset()
      }
    />
  );
}
