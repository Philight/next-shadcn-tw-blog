import {
  DetailedHTMLProps, HTMLAttributes, ReactNode 
} from 'react';

import Header from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import Hero from '@/components/organisms/Hero';

import { cn } from '@/utils/functions';
import type { IGenericProps } from '@/types/generic-types';

// ==================================================================

export interface MainPropsType extends IGenericProps, Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'style'> {
  children: ReactNode;
  title: string;
}

const Main = ({ className, children, title = 'Title' }: MainPropsType) => {
  return (
    <div className={cn('layout__c layout--main', className)}>
      <Header />
      <main className={cn('f-col')}>
        <Hero
          className=""
          title={title}
          imageProps={{
            src: '/assets/images/blog_banner.jpg',
            fill: true,
            alt: 'Blog Background',
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Main;
