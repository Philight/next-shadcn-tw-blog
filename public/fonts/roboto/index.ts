import { Roboto } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
})
