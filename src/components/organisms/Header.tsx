'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Icon from '@/atoms/Icon';
import FloatingMenu from '@/organisms/FloatingMenu';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/shadcn/navigation-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/shadcn/menubar';

import { useActiveLink } from '@/hooks/useActiveLink';
import { AVAILABLE_LOCALES, ICONS_SIZES } from '@/utils/constants';
import { routes, navigation } from '/src/navigation';
import { cn } from '@/utils/functions';
import type { IGenericProps, IGenericComponent } from '@/types/generic-types';

import { List, Moon, Sun } from 'lucide-react';
import { roboto } from '/public/fonts/roboto';

// ================================================================

interface Props extends IGenericProps {}

export default function Header({ className }: Props) {
  const t = useTranslations();
  // const active = useActiveLink(data.path, !!data.children);
  const pathname = usePathname();

  return (
    <header className={cn('header__c', roboto.className, className)}>
      <Link href={routes.home}>
        <Icon.Q2Logo className="logo" />
      </Link>

      <FloatingMenu />

      <nav className="navigation__c navigation--desktop show-tablet show-desktop">
        <li className={cn('', pathname.includes(routes.blog.root) && 'active')}>
          <Link href={routes.blog.root}>{t('navigation.blog')}</Link>
        </li>
        <li className={cn('', pathname.includes(routes.posts.create) && 'active')}>
          <Link href={routes.posts.create}>{t('navigation.create_post')}</Link>
        </li>
      </nav>

      <BurgerMenu className="navigation--mobile show-mobile" />
    </header>
  );
}

// ================================================================

interface BurgerMenuProps extends IGenericProps {}

function BurgerMenu({ className }: BurgerMenuProps) {
  const t = useTranslations();
  return (
    <NavigationMenu className={cn('navigation__c', className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <List size={ICONS_SIZES.sm} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="navigation__menu">
            <ul className="grid w-[200px] gap-3 p-4  ">
              {navigation.map((item) => (
                <ListItem key={uuidv4()} title={item.title(t)} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ================================================================

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

// ================================================================
