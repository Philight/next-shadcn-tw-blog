import Heading from '@/components/atoms/Heading';
import { ProfileInfo } from '@/components/organisms/ProfileInfo';
import { getUser } from '@/utils/api/userApi';
import Hero from '@/components/organisms/Hero';
import { getTranslations } from 'next-intl/server';
import { ProfileSocials } from '@/components/organisms/ProfileSocials';
import { ProfileDelete } from '@/components/organisms/ProfileDelete';
import Main from '@/layouts/Main';

const Profile = async () => {
  const user = await getUser();
  const t = await getTranslations('profile');

  if (!user) {
    return (
      <Main className="h-lvh flex justify-center items-center gap-8">
        <Heading>No user found.</Heading>
      </Main>
    );
  }

  return (
    <Main>
      <Hero title={t('hero_title', { name: user.username })} />
      <ProfileInfo user={user} />
      <ProfileSocials socials={user.socials} />
      <ProfileDelete />
    </Main>
  );
};

export default Profile;
