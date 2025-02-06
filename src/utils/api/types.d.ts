// import { ProfilesIndexType } from '@/features/Profiles/types/Profiles';
// import type { ImageType, IndexParamsType } from '@/types';

export interface PostType {
  id?: string | number;
  title: string;
  content: string;
  author: string;
  image?: string | null | undefined;
  createdAt: {
    date: string | Date;
    timezone_type: number;
    timezone: string;
  };
}

export interface CreatePostParams {
  title: string;
  content: string;
  author: string;
}

export interface SubcategoryType extends CategoryType {
  category_id?: number;
}
