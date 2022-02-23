import classNames from 'classnames';
import { useMemo } from 'react';

import { SOCIAL_LINK } from 'modules/common/const';

import {
  Twitter,
  Discord,
  Medium,
  Telegram,
} from '../../../common/components/Icons/Socials';

import { ISocialItem, SocialItem } from './SocialItem';
import { useSocialsStyles as useStyles } from './useSocialsStyles';

interface ISocials {
  className?: string;
}

export const Socials = ({ className = '' }: ISocials): JSX.Element => {
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
      {socialList.map(item => (
        <SocialItem key={item.title} {...item} />
      ))}
    </div>
  );
};
