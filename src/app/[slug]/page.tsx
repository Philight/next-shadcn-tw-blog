import { getTranslations } from 'next-intl/server';
import Hero from '@/components/organisms/Hero';
import { getUserPublic } from '@/utils/api/userPublicApi';
import { notFound } from 'next/navigation';
import Heading from '@/components/atoms/Heading';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip';
import { v4 as uuidv4 } from 'uuid';
import { Badge } from '@/components/shadcn/badge';
import Main from '@/layouts/Main';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';

export type ImageDataType = {
  img: {
    src: string;
    height: number;
    width: number;
  };
  base64: string;
};

export default async function UserPublic({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('user');
  // const user = await getUserPublic(slug);
  const user = null;

  if (!user) {
    notFound();
  }

  const userBio = user.bio ? user.bio : t('user_no_bio');
  const userHasSocials = user.socials && user.socials.length !== 0;

  return (
    <Main>
      <Hero title={t('hero_title', { name: user.username })} />
      <div className="space-y-8 flex flex-col justify-center items-center text-center">
        <Avatar className="w-48 h-48">
          <AvatarImage src={user.avatar} alt="user avatar" height={200} width={200} />
          <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="space-y-4 max-w-lg">
          <div>
            <Heading size="text-xl" tag="h2">
              {user.username}
            </Heading>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <p>{userBio}</p>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {userHasSocials ? (
              user.socials.map((social) => (
                <Tooltip key={uuidv4()}>
                  <TooltipTrigger>
                    <Badge>
                      <a target="_blank" rel="noopener noreferrer" href={social.url}>
                        {social.label}
                      </a>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.tag}</p>
                  </TooltipContent>
                </Tooltip>
              ))
            ) : (
              <p>{t('user_no_socials')}</p>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
}
