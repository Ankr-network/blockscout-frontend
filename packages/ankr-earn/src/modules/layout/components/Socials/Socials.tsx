import { useSocialsStyles as useStyles } from './useSocialsStyles';
import {
  Twitter,
  Discord,
  Medium,
  Telegram,
} from '../../../common/components/Icons/Socials';
import { useMemo } from 'react';
import { ISocialItem, SocialItem } from './SocialItem';
import classNames from 'classnames';
import { SOCIAL_LINK } from 'modules/common/const';

interface ISocials {
  className?: string;
}

export const Socials = ({ className = '' }: ISocials) => {
  const classes = useStyles();

  const socialList: ISocialItem[] = useMemo(
    () => [
      {
        title: 'twitter',
        icon: <Twitter />,
        href: SOCIAL_LINK.twitter,
      },
      {
        title: 'telegram',
        icon: <Telegram />,
        href: SOCIAL_LINK.telegram,
      },
      {
        title: 'medium',
        icon: <Medium />,
        href: SOCIAL_LINK.medium,
      },
      {
        title: 'discord',
        icon: <Discord />,
        href: SOCIAL_LINK.discord,
      },
    ],
    [],
  );

  return (
    <div className={classNames(classes.root, className)}>
      {socialList.map((item, index) => (
        <SocialItem key={item.title} {...item} />
      ))}
    </div>
  );
};
