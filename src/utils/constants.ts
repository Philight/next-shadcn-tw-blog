import { Locale } from '@/i18n/request';

export const LOCALE_COOKIE_NAME = 'locale';

export const DEFAULT_LOCALE: Locale = 'cs';

export type LocaleType = {
  label: 'Česky' | 'English';
  tag: Locale;
};

export type AvailableLocalesType = LocaleType[];

export const AVAILABLE_LOCALES: AvailableLocalesType = [
  { label: 'Česky', tag: 'cs' },
  { label: 'English', tag: 'en' },
];

// ================================================

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_SERVER = typeof window === 'undefined';

export const PAGINATIOIN_LIMIT = 10;

export type InitialStateType = {
  status: number;
  message: string;
  timestamp: number;
};

export const INITIAL_STATE = { status: 500, message: '', timestamp: Date.now() };

export const ICONS_SIZES = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
};
