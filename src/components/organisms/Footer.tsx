import { cn } from '@/utils/functions';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface FooterProps extends IGenericProps {}

export async function Footer({ className }: FooterProps) {
  return <footer className={cn('footer__c', className)}>{`${new Date().getFullYear()} | Q2 Interactive s.r.o.`}</footer>;
}
