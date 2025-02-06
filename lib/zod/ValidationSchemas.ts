import {
  object, string 
} from 'zod';

export const newPostSchema = object({
  title: string({ required_error: 'Title is required' }).min(3, 'Title has to have a minimum of 3 chars'),
  content: string({ required_error: 'Content is required' }).min(10, 'Content has to have a minimum of 10 characters'),
  author: string({ required_error: 'Author is required' }).min(1, 'Author is required'),
});
