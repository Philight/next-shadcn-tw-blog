import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import { locales, pathnames, localePrefix } from './config-global';
// import { locale, messages } from '../i18n/request';

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});

const ROOTS = {
  HOME: '/',
  BLOG: '/blog',
  POSTS: '/posts',
  LEGAL: '/legal',
};

export const routes = {
  home: '/',
  landing: {
    root: ROOTS.HOME,
  },
  // BLOG
  blog: {
    root: ROOTS.BLOG,
  },
  posts: {
    root: ROOTS.POSTS,
    id: `${ROOTS.POSTS}/{$id}`,
    create: `${ROOTS.POSTS}/create`,
  },
  // LEGAL
  legal: {
    termsConditions: `${ROOTS.LEGAL}/terms-and-conditions`,
    privacyPolicy: `${ROOTS.LEGAL}/privacy-policy`,
  },
};

export const navigation: { title: string; href: string; description: string }[] = [
  {
    title: (translations: any) => translations('navigation.blog'),
    href: routes.blog.root,
    description: 'The Blog',
  },
  {
    title: (translations: any) => translations('navigation.create_post'),
    href: routes.posts.create,
    description: 'Create a new post',
  },
];
